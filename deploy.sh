#!/bin/bash

# Script de despliegue para Vercel
# CQ Sublimación Admin Panel

echo "🚀 Iniciando proceso de despliegue..."

# Verificar si Git está inicializado
if [ ! -d .git ]; then
    echo "📦 Inicializando Git..."
    git init
fi

# Agregar todos los archivos
echo "📝 Agregando archivos..."
git add .

# Solicitar mensaje de commit
echo "💬 Ingresa el mensaje del commit:"
read commit_message

if [ -z "$commit_message" ]; then
    commit_message="Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Hacer commit
echo "✅ Creando commit..."
git commit -m "$commit_message"

# Verificar si existe remote origin
if ! git remote | grep -q origin; then
    echo "⚠️  No se ha configurado el repositorio remoto."
    echo "Por favor, crea un repositorio en GitHub y ejecuta:"
    echo "git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git"
    exit 1
fi

# Push a GitHub
echo "📤 Subiendo cambios a GitHub..."
git push origin main

echo "✨ ¡Cambios subidos exitosamente!"
echo "🌐 Vercel detectará automáticamente los cambios y desplegará la nueva versión."
echo "📊 Revisa el progreso en: https://vercel.com/dashboard"
