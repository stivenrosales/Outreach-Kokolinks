#!/bin/bash

# Script de inicio para Outreach Kokolinks
# Autor: Kokolinks
# Versión: 1.0.0

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Iniciando Outreach Kokolinks"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "📥 Descárgalo desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"
echo ""

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
    echo ""
fi

# Verificar si existe el archivo .env
if [ ! -f ".env" ]; then
    echo "⚠️  Creando archivo .env desde .env.example..."
    cp .env.example .env
    echo "✅ Archivo .env creado"
    echo "💡 Recuerda configurar tu OPENAI_API_KEY en el archivo .env"
    echo ""
fi

# Iniciar el servidor
echo "🎯 Iniciando servidor..."
echo ""

npm start
