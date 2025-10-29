# 🚀 INICIO RÁPIDO - Outreach Kokolinks

## Pasos para Ejecutar la Aplicación

### 1. Abrir Terminal

Abre una terminal y navega a la carpeta del proyecto:

```bash
cd "/Users/stivenkevinrosalescasas/Downloads/Outreach Kokolinks"
```

### 2. Instalar Dependencias (Solo la primera vez)

```bash
npm install
```

### 3. Iniciar el Servidor

```bash
npm start
```

O en modo desarrollo con auto-reload:

```bash
npm run dev
```

### 4. Abrir en el Navegador

El servidor estará disponible en:

**http://localhost:3000**

---

## ✅ Servidor Iniciado Correctamente

Si ves este mensaje, la aplicación está funcionando:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Outreach Kokolinks Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Servidor corriendo en: http://localhost:3000
🌍 Entorno: development
🤖 OpenAI API: ✓ Configurada
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🔑 Configurar API Key de OpenAI

Tienes dos opciones:

### Opción 1: En el archivo .env (Recomendado)

Edita el archivo `.env` y agrega tu API Key:

```env
OPENAI_API_KEY=sk-tu-clave-aqui
```

### Opción 2: En la Interfaz Web

Simplemente ingresa tu API Key en la sección amarilla de la aplicación web.

---

## 🛑 Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

---

## 📱 Uso Rápido

1. Abre http://localhost:3000
2. Ingresa tu API Key de OpenAI
3. Pega un correo en el área de texto
4. Haz clic en "Procesar con IA"
5. Revisa y edita la información extraída
6. Haz clic en "Enviar a Sheet"

---

## ❓ Problemas Comunes

### Puerto 3000 ya está en uso

Cambia el puerto en el archivo `.env`:

```env
PORT=3001
```

### Falta Node.js

Descarga e instala Node.js desde: https://nodejs.org/

### Error con npm install

Intenta:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

**¡Listo para usar!** 🎉

Para más información, consulta el [README.md](README.md)
