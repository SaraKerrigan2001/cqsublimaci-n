# 🚀 Instrucciones Rápidas - Despliegue en Vercel

## Método Más Rápido (5 minutos)

### 1️⃣ Crear cuenta en Vercel
- Ve a https://vercel.com
- Regístrate con tu cuenta de GitHub

### 2️⃣ Subir código a GitHub

**Opción A: Usando GitHub Desktop (Más fácil)**
1. Descarga GitHub Desktop: https://desktop.github.com
2. Abre GitHub Desktop
3. File → Add Local Repository → Selecciona tu carpeta del proyecto
4. Click en "Publish repository"
5. Elige un nombre y click en "Publish Repository"

**Opción B: Usando comandos (Terminal/CMD)**
```bash
# Inicializar Git
git init

# Agregar archivos
git add .

# Crear commit
git commit -m "Initial commit"

# Crear repositorio en GitHub (ve a github.com/new)
# Luego conecta tu repositorio:
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

### 3️⃣ Desplegar en Vercel

1. Ve a https://vercel.com/dashboard
2. Click en "Add New..." → "Project"
3. Selecciona tu repositorio de GitHub
4. Click en "Import"
5. En "Environment Variables" agrega:
   ```
   DATABASE_URL=file:./dev.db
   JWT_SECRET=cambiar_por_secreto_seguro_123456
   NEXTAUTH_SECRET=cambiar_por_otro_secreto_seguro_789
   ```
6. Click en "Deploy"
7. ¡Espera 2-3 minutos y listo! 🎉

### 4️⃣ Acceder a tu sitio

Tu sitio estará disponible en: `https://tu-proyecto.vercel.app`

**Credenciales de Admin:**
- Email: `paitocapacho5@gmail.com`
- Password: `1234`

---

## 🔄 Para Actualizar tu Sitio

Cada vez que hagas cambios:

**Con GitHub Desktop:**
1. Abre GitHub Desktop
2. Escribe un mensaje describiendo los cambios
3. Click en "Commit to main"
4. Click en "Push origin"
5. Vercel actualizará automáticamente

**Con comandos:**
```bash
git add .
git commit -m "Descripción de cambios"
git push
```

---

## ⚡ Script Automático (Windows)

Simplemente ejecuta:
```bash
deploy.bat
```

---

## 📱 Acceso desde el Celular

Una vez desplegado, puedes acceder desde cualquier dispositivo:
- Abre el navegador en tu celular
- Ve a: `https://tu-proyecto.vercel.app`
- Inicia sesión con las credenciales de admin

---

## ❓ Problemas Comunes

**"No puedo hacer push a GitHub"**
- Asegúrate de haber creado el repositorio en GitHub primero
- Verifica que hayas configurado el remote: `git remote -v`

**"El deploy falla en Vercel"**
- Revisa los logs en Vercel Dashboard
- Verifica que las variables de entorno estén configuradas

**"No puedo iniciar sesión"**
- Usa las credenciales: `paitocapacho5@gmail.com` / `1234`
- Verifica que la base de datos esté configurada

---

## 🎯 Siguiente Paso

Para usar una base de datos real en producción (recomendado):
1. Ve a tu proyecto en Vercel
2. Click en "Storage" → "Create Database" → "Postgres"
3. Sigue las instrucciones
4. Redeploya tu proyecto

---

## 📞 Necesitas Ayuda?

Lee la guía completa en: `DEPLOY_VERCEL.md`
