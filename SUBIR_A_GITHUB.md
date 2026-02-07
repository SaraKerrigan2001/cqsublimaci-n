# 🚀 Guía para Subir a GitHub

## ✅ Estado Actual

Tu código ya está preparado y con commit hecho:
- ✅ Git inicializado
- ✅ Archivos agregados
- ✅ Commit creado: "feat: Complete admin panel with CRUD operations..."
- ⏭️ Falta: Crear repositorio en GitHub y hacer push

---

## 📝 Pasos para Subir a GitHub

### Opción 1: Usando GitHub.com (Más Fácil) 🌟

#### Paso 1: Crear el Repositorio en GitHub

1. **Abre tu navegador** y ve a: https://github.com/new

2. **Completa el formulario:**
   - **Repository name:** `cq-sublimacion-admin` (o el nombre que prefieras)
   - **Description:** "Panel de administración para CQ Sublimación con Next.js, Prisma y TypeScript"
   - **Visibilidad:** 
     - ✅ **Private** (recomendado para proyectos de clientes)
     - ⬜ Public (si quieres que sea público)
   - **NO marques:**
     - ⬜ Add a README file
     - ⬜ Add .gitignore
     - ⬜ Choose a license

3. **Click en "Create repository"**

#### Paso 2: Conectar tu Proyecto Local

Después de crear el repositorio, GitHub te mostrará instrucciones. Copia la URL que aparece (algo como: `https://github.com/TU_USUARIO/cq-sublimacion-admin.git`)

**Luego ejecuta estos comandos en tu terminal:**

```bash
# Conectar con el repositorio remoto
git remote add origin https://github.com/TU_USUARIO/cq-sublimacion-admin.git

# Verificar que se agregó correctamente
git remote -v

# Subir tu código a GitHub
git push -u origin main
```

**Si te pide credenciales:**
- Usuario: Tu nombre de usuario de GitHub
- Contraseña: Usa un **Personal Access Token** (no tu contraseña normal)

#### Paso 3: Crear Personal Access Token (si es necesario)

Si GitHub te pide contraseña y no funciona:

1. Ve a: https://github.com/settings/tokens
2. Click en "Generate new token" → "Generate new token (classic)"
3. Nombre: "CQ Sublimacion Deploy"
4. Selecciona: ✅ **repo** (todos los permisos de repo)
5. Click en "Generate token"
6. **COPIA EL TOKEN** (solo se muestra una vez)
7. Usa este token como contraseña cuando Git te lo pida

---

### Opción 2: Usando GitHub Desktop (Más Visual) 🖥️

#### Paso 1: Descargar GitHub Desktop

1. Ve a: https://desktop.github.com
2. Descarga e instala GitHub Desktop
3. Abre GitHub Desktop e inicia sesión con tu cuenta de GitHub

#### Paso 2: Publicar tu Repositorio

1. En GitHub Desktop, click en **"File"** → **"Add Local Repository"**
2. Selecciona la carpeta de tu proyecto: `D:\OneDrive\Documents\Mini-Proyecto`
3. Click en **"Add Repository"**
4. Click en **"Publish repository"** (botón azul arriba)
5. Completa:
   - Name: `cq-sublimacion-admin`
   - Description: "Panel de administración CQ Sublimación"
   - ✅ Keep this code private (recomendado)
6. Click en **"Publish Repository"**

¡Listo! Tu código ya está en GitHub.

---

## 🔄 Comandos Rápidos (Resumen)

Si ya creaste el repositorio en GitHub, ejecuta:

```bash
# Conectar con GitHub (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# Subir el código
git push -u origin main
```

---

## ✅ Verificar que se Subió Correctamente

1. Ve a: `https://github.com/TU_USUARIO/cq-sublimacion-admin`
2. Deberías ver todos tus archivos
3. Verifica que aparezcan:
   - ✅ Carpetas: `app`, `components`, `prisma`, etc.
   - ✅ Archivos: `package.json`, `README.md`, etc.
   - ✅ Documentación: `DEPLOY_VERCEL.md`, etc.

---

## 🎯 Después de Subir a GitHub

Una vez que tu código esté en GitHub, puedes:

1. **Desplegar en Vercel:**
   - Ve a: https://vercel.com/dashboard
   - Click en "Add New..." → "Project"
   - Selecciona tu repositorio
   - Sigue las instrucciones en `DEPLOY_VERCEL.md`

2. **Compartir el Repositorio:**
   - Envía el link: `https://github.com/TU_USUARIO/cq-sublimacion-admin`
   - Otros pueden ver el código (si es público)
   - Puedes invitar colaboradores (si es privado)

---

## 🔐 Seguridad

**IMPORTANTE:** Tu archivo `.env` NO se subirá a GitHub (está en `.gitignore`). Esto es correcto para proteger tus secretos.

**Archivos que NO se suben:**
- ✅ `.env` (variables de entorno)
- ✅ `node_modules/` (dependencias)
- ✅ `.next/` (build)
- ✅ `*.db` (base de datos)

---

## ❓ Problemas Comunes

### "Permission denied (publickey)"

**Solución:** Usa HTTPS en lugar de SSH:
```bash
git remote set-url origin https://github.com/TU_USUARIO/TU_REPO.git
```

### "Authentication failed"

**Solución:** Usa un Personal Access Token en lugar de tu contraseña:
1. Crea el token en: https://github.com/settings/tokens
2. Usa el token como contraseña

### "Repository not found"

**Solución:** Verifica que:
- El repositorio existe en GitHub
- La URL es correcta
- Tienes permisos para acceder al repositorio

---

## 📞 Siguiente Paso

Después de subir a GitHub:
1. ✅ Código en GitHub
2. ⏭️ Desplegar en Vercel (lee `DEPLOY_VERCEL.md`)
3. ⏭️ ¡Tu sitio estará en línea!

---

**¿Necesitas ayuda?** Sigue esta guía paso a paso y estarás listo en 5 minutos.
