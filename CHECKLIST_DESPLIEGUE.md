# ✅ Checklist de Despliegue en Vercel

## Antes de Empezar

- [ ] Tienes una cuenta de GitHub (si no, créala en https://github.com)
- [ ] Tienes una cuenta de Vercel (si no, créala en https://vercel.com)
- [ ] Tu proyecto funciona localmente

## Paso 1: Preparar el Código

- [x] ✅ Scripts de build configurados en package.json
- [x] ✅ Archivo vercel.json creado
- [x] ✅ Archivo .gitignore configurado
- [x] ✅ Variables de entorno documentadas

## Paso 2: Subir a GitHub

### Opción A: GitHub Desktop (Recomendado para principiantes)

- [ ] Descargar GitHub Desktop desde https://desktop.github.com
- [ ] Instalar y abrir GitHub Desktop
- [ ] File → Add Local Repository
- [ ] Seleccionar la carpeta de tu proyecto
- [ ] Click en "Publish repository"
- [ ] Elegir nombre del repositorio
- [ ] Marcar o desmarcar "Keep this code private"
- [ ] Click en "Publish Repository"

### Opción B: Línea de Comandos

- [ ] Abrir terminal/CMD en la carpeta del proyecto
- [ ] Ejecutar: `git init`
- [ ] Ejecutar: `git add .`
- [ ] Ejecutar: `git commit -m "Initial commit"`
- [ ] Crear repositorio en GitHub (https://github.com/new)
- [ ] Ejecutar: `git remote add origin https://github.com/TU_USUARIO/TU_REPO.git`
- [ ] Ejecutar: `git branch -M main`
- [ ] Ejecutar: `git push -u origin main`

## Paso 3: Desplegar en Vercel

- [ ] Ir a https://vercel.com/dashboard
- [ ] Click en "Add New..." → "Project"
- [ ] Seleccionar tu repositorio de GitHub
- [ ] Click en "Import"
- [ ] Verificar que Framework Preset sea "Next.js"
- [ ] Agregar variables de entorno:
  - [ ] `DATABASE_URL` = `file:./dev.db`
  - [ ] `JWT_SECRET` = (genera un secreto único)
  - [ ] `NEXTAUTH_SECRET` = (genera otro secreto único)
  - [ ] `NEXTAUTH_URL` = (déjalo vacío por ahora, lo actualizarás después)
- [ ] Click en "Deploy"
- [ ] Esperar 2-5 minutos

## Paso 4: Verificar el Despliegue

- [ ] El build se completó sin errores
- [ ] Copiar la URL de tu proyecto (ej: https://tu-proyecto.vercel.app)
- [ ] Actualizar variable `NEXTAUTH_URL` con tu URL real
- [ ] Visitar tu sitio web
- [ ] La página principal carga correctamente
- [ ] Puedes acceder a /admin
- [ ] Puedes iniciar sesión con:
  - Email: `paitocapacho5@gmail.com`
  - Password: `1234`

## Paso 5: Probar Funcionalidades

- [ ] Dashboard se muestra correctamente
- [ ] Sección Clientes funciona
  - [ ] Ver cliente
  - [ ] Editar cliente
  - [ ] Eliminar cliente
  - [ ] Agregar cliente
- [ ] Sección Pedidos funciona
  - [ ] Ver pedido
  - [ ] Editar pedido
  - [ ] Eliminar pedido
  - [ ] Nuevo pedido
- [ ] Sección Productos funciona
  - [ ] Editar producto
  - [ ] Eliminar producto
  - [ ] Agregar producto
- [ ] Modo oscuro/claro funciona
- [ ] Responsive en móvil funciona
- [ ] Notificaciones aparecen correctamente

## Paso 6: Configuración Adicional (Opcional pero Recomendado)

- [ ] Configurar dominio personalizado en Vercel
- [ ] Configurar base de datos de producción (Vercel Postgres o Supabase)
- [ ] Cambiar credenciales de admin por seguridad
- [ ] Configurar analytics en Vercel
- [ ] Configurar notificaciones de deploy

## Paso 7: Mantenimiento

- [ ] Guardar la URL de tu proyecto
- [ ] Guardar las credenciales de admin en un lugar seguro
- [ ] Documentar cómo hacer actualizaciones
- [ ] Configurar backups de la base de datos (si usas producción)

## 🎉 ¡Completado!

Si marcaste todas las casillas, tu proyecto está desplegado exitosamente en Vercel.

---

## 📝 Notas Importantes

**Para generar secretos seguros:**
```bash
# En Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# O usa un generador online:
# https://generate-secret.vercel.app/32
```

**Para actualizar tu sitio:**
1. Haz cambios en tu código local
2. Usa `deploy.bat` (Windows) o `deploy.sh` (Linux/Mac)
3. O manualmente: `git add . && git commit -m "mensaje" && git push`
4. Vercel desplegará automáticamente

**URLs Importantes:**
- Tu proyecto: https://tu-proyecto.vercel.app
- Dashboard Vercel: https://vercel.com/dashboard
- Repositorio GitHub: https://github.com/TU_USUARIO/TU_REPO

---

## ❓ ¿Problemas?

Si algo no funciona:
1. Revisa los logs en Vercel Dashboard → Deployments → Click en el deployment → View Function Logs
2. Verifica las variables de entorno en Vercel → Settings → Environment Variables
3. Lee `DEPLOY_VERCEL.md` para solución de problemas detallada
4. Asegúrate de que el build local funcione: `npm run build`

---

**Última actualización:** $(date)
**Versión del proyecto:** 1.0.0
**Estado:** ✅ Listo para desplegar
