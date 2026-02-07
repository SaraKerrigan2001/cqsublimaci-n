# ⚡ Guía Rápida - Subir a GitHub (2 minutos)

## 🎯 Método Más Rápido

### Opción A: Script Automático (Recomendado) 🤖

1. **Doble click en:** `subir-github.bat`
2. **Sigue las instrucciones** en pantalla
3. **¡Listo!** Tu código estará en GitHub

---

### Opción B: Manual (3 pasos) 📝

#### 1️⃣ Crear Repositorio en GitHub (1 min)

**Abre:** https://github.com/new

**Completa:**
- Name: `cq-sublimacion-admin`
- Description: `Panel de administración CQ Sublimación`
- ✅ Private
- Click "Create repository"

#### 2️⃣ Copiar URL (10 seg)

Después de crear el repo, copia la URL que aparece:
```
https://github.com/TU_USUARIO/cq-sublimacion-admin.git
```

#### 3️⃣ Ejecutar Comandos (30 seg)

**Abre CMD/PowerShell** en tu carpeta del proyecto y ejecuta:

```bash
# Conectar con GitHub (reemplaza la URL con la tuya)
git remote add origin https://github.com/TU_USUARIO/cq-sublimacion-admin.git

# Subir el código
git push -u origin main
```

**Si te pide usuario/contraseña:**
- Usuario: Tu usuario de GitHub
- Contraseña: Usa un Personal Access Token (no tu contraseña)
  - Créalo aquí: https://github.com/settings/tokens
  - Permisos: ✅ repo

---

## ✅ Verificar

Ve a: `https://github.com/TU_USUARIO/cq-sublimacion-admin`

Deberías ver todos tus archivos 🎉

---

## 🚀 Siguiente Paso

**Desplegar en Vercel:**
1. Ve a: https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Selecciona tu repositorio
4. Click "Deploy"

**Tiempo total:** ~5 minutos

---

## ❓ Problemas

**"Authentication failed"**
→ Usa un Personal Access Token: https://github.com/settings/tokens

**"Permission denied"**
→ Verifica que la URL sea HTTPS (no SSH)

**"Repository not found"**
→ Verifica que creaste el repositorio en GitHub

---

## 📞 Ayuda Completa

Lee: `SUBIR_A_GITHUB.md` para instrucciones detalladas
