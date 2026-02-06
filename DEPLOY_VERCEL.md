# 🚀 Guía de Despliegue en Vercel

## Opción 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Subir el código a GitHub

1. **Inicializar Git (si no lo has hecho):**
```bash
git init
git add .
git commit -m "Initial commit - CQ Sublimación Admin Panel"
```

2. **Crear un repositorio en GitHub:**
   - Ve a https://github.com/new
   - Crea un nuevo repositorio (puede ser privado o público)
   - NO inicialices con README, .gitignore o licencia

3. **Conectar y subir tu código:**
```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

### Paso 2: Desplegar en Vercel

1. **Ve a Vercel:**
   - Visita https://vercel.com
   - Inicia sesión con tu cuenta de GitHub

2. **Importar Proyecto:**
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio de GitHub
   - Click en "Import"

3. **Configurar Variables de Entorno:**
   En la sección "Environment Variables", agrega:

   ```
   DATABASE_URL=file:./dev.db
   JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar
   NEXTAUTH_SECRET=otro_secreto_super_seguro_aqui_cambiar
   NEXTAUTH_URL=https://tu-proyecto.vercel.app
   ```

   **IMPORTANTE:** Cambia los valores de `JWT_SECRET` y `NEXTAUTH_SECRET` por valores únicos y seguros.

4. **Configuración del Build:**
   - Framework Preset: Next.js
   - Build Command: `npm run build` (ya configurado)
   - Output Directory: `.next` (automático)
   - Install Command: `npm install` (automático)

5. **Deploy:**
   - Click en "Deploy"
   - Espera a que termine el despliegue (2-5 minutos)

### Paso 3: Configurar Base de Datos (Producción)

Para producción, se recomienda usar una base de datos real en lugar de SQLite:

**Opción A: Vercel Postgres (Recomendado)**
1. En tu proyecto de Vercel, ve a "Storage"
2. Click en "Create Database" → "Postgres"
3. Sigue las instrucciones
4. Vercel agregará automáticamente `DATABASE_URL` a tus variables de entorno

**Opción B: Supabase (Gratis)**
1. Ve a https://supabase.com
2. Crea un nuevo proyecto
3. Copia la "Connection String" de PostgreSQL
4. Actualiza `DATABASE_URL` en Vercel con esta URL

Después de configurar la base de datos:
```bash
# Actualiza el schema de Prisma para PostgreSQL
# En prisma/schema.prisma, cambia:
# provider = "sqlite" → provider = "postgresql"

# Luego redeploya desde Vercel
```

---

## Opción 2: Despliegue Directo con Vercel CLI

### Paso 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Paso 2: Login en Vercel

```bash
vercel login
```

### Paso 3: Desplegar

```bash
# Desde la raíz de tu proyecto
vercel

# Para producción
vercel --prod
```

### Paso 4: Configurar Variables de Entorno

```bash
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add NEXTAUTH_SECRET
vercel env add NEXTAUTH_URL
```

---

## 📋 Checklist Post-Despliegue

- [ ] El sitio carga correctamente
- [ ] Puedes acceder a la página principal
- [ ] El login de admin funciona
- [ ] El dashboard se muestra correctamente
- [ ] Las secciones de Clientes, Pedidos y Productos funcionan
- [ ] Los modales se abren y cierran correctamente
- [ ] El modo oscuro/claro funciona

---

## 🔧 Solución de Problemas

### Error: "Module not found: Can't resolve '@prisma/client'"
**Solución:** Asegúrate de que el script `postinstall` esté en package.json:
```json
"postinstall": "prisma generate"
```

### Error: "Database connection failed"
**Solución:** Verifica que `DATABASE_URL` esté configurada correctamente en las variables de entorno de Vercel.

### Error de Build
**Solución:** Revisa los logs en Vercel Dashboard → Tu Proyecto → Deployments → Click en el deployment fallido → Ver logs.

### El sitio se ve diferente en producción
**Solución:** Limpia la caché del navegador o usa modo incógnito.

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios en tu código:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel detectará automáticamente los cambios y desplegará la nueva versión.

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Vercel Dashboard
2. Verifica las variables de entorno
3. Asegúrate de que el build local funcione: `npm run build`

---

## 🎉 ¡Listo!

Tu aplicación CQ Sublimación Admin Panel está ahora en producción.

**URL de tu proyecto:** https://tu-proyecto.vercel.app

**Credenciales de Admin:**
- Email: paitocapacho5@gmail.com
- Password: 1234

**IMPORTANTE:** Cambia estas credenciales después del primer login en producción.
