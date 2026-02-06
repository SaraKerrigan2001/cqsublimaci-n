@echo off
REM Script de despliegue para Vercel (Windows)
REM CQ Sublimación Admin Panel

echo 🚀 Iniciando proceso de despliegue...

REM Verificar si Git está inicializado
if not exist .git (
    echo 📦 Inicializando Git...
    git init
)

REM Agregar todos los archivos
echo 📝 Agregando archivos...
git add .

REM Solicitar mensaje de commit
set /p commit_message="💬 Ingresa el mensaje del commit: "

if "%commit_message%"=="" (
    set commit_message=Update: %date% %time%
)

REM Hacer commit
echo ✅ Creando commit...
git commit -m "%commit_message%"

REM Verificar si existe remote origin
git remote | findstr origin >nul
if errorlevel 1 (
    echo ⚠️  No se ha configurado el repositorio remoto.
    echo Por favor, crea un repositorio en GitHub y ejecuta:
    echo git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    pause
    exit /b 1
)

REM Push a GitHub
echo 📤 Subiendo cambios a GitHub...
git push origin main

echo ✨ ¡Cambios subidos exitosamente!
echo 🌐 Vercel detectará automáticamente los cambios y desplegará la nueva versión.
echo 📊 Revisa el progreso en: https://vercel.com/dashboard
pause
