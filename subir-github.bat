@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║        🚀 Subir Proyecto a GitHub - CQ Sublimación        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Verificar si Git está instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git no está instalado.
    echo.
    echo Por favor, descarga e instala Git desde:
    echo https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo ✅ Git está instalado
echo.

REM Verificar estado de Git
echo 📊 Verificando estado del repositorio...
git status >nul 2>&1
if errorlevel 1 (
    echo ❌ Este directorio no es un repositorio Git.
    echo.
    echo Inicializando Git...
    git init
    git add .
    git commit -m "Initial commit: CQ Sublimación Admin Panel"
)

echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo 📝 PASO 1: Crear Repositorio en GitHub
echo.
echo Por favor, sigue estos pasos:
echo.
echo 1. Abre tu navegador y ve a: https://github.com/new
echo 2. Completa el formulario:
echo    - Repository name: cq-sublimacion-admin
echo    - Description: Panel de administración CQ Sublimación
echo    - Visibilidad: Private (recomendado)
echo    - NO marques ninguna opción adicional
echo 3. Click en "Create repository"
echo.
echo ═══════════════════════════════════════════════════════════
echo.
pause

echo.
echo 📝 PASO 2: Conectar con GitHub
echo.
set /p github_url="Pega la URL de tu repositorio (ej: https://github.com/usuario/repo.git): "

if "%github_url%"=="" (
    echo ❌ No ingresaste una URL.
    echo.
    pause
    exit /b 1
)

echo.
echo 🔗 Conectando con GitHub...
git remote remove origin 2>nul
git remote add origin %github_url%

if errorlevel 1 (
    echo ❌ Error al conectar con GitHub.
    echo.
    pause
    exit /b 1
)

echo ✅ Repositorio remoto configurado
echo.

REM Verificar la rama actual
for /f "tokens=*" %%i in ('git branch --show-current') do set current_branch=%%i

if "%current_branch%"=="" (
    echo 🔄 Creando rama main...
    git branch -M main
)

echo.
echo 📤 PASO 3: Subiendo código a GitHub...
echo.
echo Esto puede tomar unos momentos...
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ⚠️  Error al hacer push.
    echo.
    echo Posibles soluciones:
    echo 1. Verifica que la URL del repositorio sea correcta
    echo 2. Asegúrate de tener permisos en el repositorio
    echo 3. Si te pide credenciales, usa un Personal Access Token
    echo.
    echo Para crear un token:
    echo https://github.com/settings/tokens
    echo.
    pause
    exit /b 1
)

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    ✅ ¡ÉXITO!                              ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo 🎉 Tu código se ha subido exitosamente a GitHub
echo.
echo 🌐 Puedes verlo en: %github_url:.git=%
echo.
echo ═══════════════════════════════════════════════════════════
echo.
echo 📋 PRÓXIMOS PASOS:
echo.
echo 1. ✅ Código en GitHub
echo 2. ⏭️  Desplegar en Vercel
echo.
echo Para desplegar en Vercel:
echo - Abre: DEPLOY_VERCEL.md
echo - O ve a: https://vercel.com/dashboard
echo.
echo ═══════════════════════════════════════════════════════════
echo.
pause
