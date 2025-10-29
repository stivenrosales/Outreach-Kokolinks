# 🚀 Outreach Kokolinks

Sistema automatizado de procesamiento de correos de outreach con Inteligencia Artificial (OpenAI GPT-4o).

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Endpoints](#api-endpoints)
- [Tecnologías](#tecnologías)

## ✨ Características

- 🤖 **Procesamiento con IA**: Utiliza GPT-4o para analizar correos y generar respuestas contextuales
- 🌲 **Árbol de Decisión**: Implementa 7 casos de uso diferentes según el contenido del correo
- 🎯 **Extracción Automática**: Extrae 8 campos de datos importantes del correo
- ✏️ **Campos Editables**: Permite corregir o completar información antes de enviar
- 🔗 **Integración con n8n**: Envía datos procesados a un webhook para almacenamiento
- 🎨 **Interfaz Moderna**: UI atractiva y responsive
- 🔒 **Seguridad**: Las API keys se guardan localmente en el navegador

## 📦 Requisitos

- Node.js v16 o superior
- npm o yarn
- Clave API de OpenAI con acceso a GPT-4o
- Navegador web moderno

## 🛠 Instalación

### 1. Clonar o ubicar el proyecto

```bash
cd "Outreach Kokolinks"
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará todas las dependencias necesarias:
- express (servidor web)
- dotenv (variables de entorno)
- cors (manejo de CORS)
- body-parser (parseo de JSON)
- axios (peticiones HTTP)
- nodemon (desarrollo, opcional)

## ⚙️ Configuración

### 1. Crear archivo de variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

### 2. Configurar variables de entorno

Edita el archivo `.env` y agrega tu información:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-tu-clave-de-openai-aqui

# Server Configuration
PORT=3000
NODE_ENV=development

# Webhook Configuration
WEBHOOK_URL=https://n8n.truly.cl/webhook/90ddd17c-2893-4636-84d9-165e62006383
```

**Importante**:
- Obtén tu API Key de OpenAI en: https://platform.openai.com/api-keys
- La API Key también se puede ingresar directamente en la interfaz web

## 🚀 Ejecución

### Modo Desarrollo (con auto-reload)

```bash
npm run dev
```

### Modo Producción

```bash
npm start
```

El servidor se iniciará en: **http://localhost:3000**

Verás un mensaje como este:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Outreach Kokolinks Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 Servidor corriendo en: http://localhost:3000
🌍 Entorno: development
🤖 OpenAI API: ✓ Configurada
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Abre tu navegador en: http://localhost:3000
📝 Para detener el servidor presiona: Ctrl + C
```

## 📖 Uso

### 1. Acceder a la Aplicación

Abre tu navegador y ve a: **http://localhost:3000**

### 2. Configurar API Key

En la sección amarilla superior, ingresa tu clave API de OpenAI (comienza con `sk-`)

### 3. Procesar un Correo

1. **Pega el correo completo** en el área de texto, incluyendo:
   - Emisor (De:)
   - Destinatario (Para:)
   - Contenido del mensaje

2. **Haz clic en "Procesar con IA"** o presiona `Ctrl + Enter`

3. La IA analizará el correo y:
   - Generará una respuesta apropiada según el árbol de decisión
   - Extraerá información estructurada

### 4. Revisar y Editar

1. Revisa la respuesta generada (puedes editarla)
2. Verifica los datos extraídos
3. Edita cualquier campo que necesite corrección

### 5. Enviar a Sheet

Haz clic en "Enviar a Sheet" para enviar todos los datos al webhook de n8n.

## 📁 Estructura del Proyecto

```
Outreach Kokolinks/
├── server.js                 # Servidor principal
├── package.json             # Dependencias y scripts
├── .env                     # Variables de entorno (no incluido en git)
├── .env.example            # Ejemplo de variables de entorno
├── .gitignore              # Archivos ignorados por git
├── README.md               # Este archivo
│
├── src/                    # Código fuente del backend
│   ├── config/            # Configuraciones
│   │   └── openai.js      # Configuración de OpenAI
│   ├── controllers/       # Controladores
│   │   └── emailController.js
│   ├── routes/            # Rutas de la API
│   │   └── emailRoutes.js
│   └── services/          # Servicios
│       └── webhookService.js
│
├── public/                # Archivos públicos (frontend)
│   ├── css/
│   │   └── styles.css     # Estilos de la aplicación
│   ├── js/
│   │   └── app.js         # Lógica del frontend
│   └── assets/            # Imágenes, iconos, etc.
│
└── views/                 # Vistas HTML
    └── index.html         # Página principal
```

## 🔌 API Endpoints

### POST /api/email/process

Procesa un email usando IA.

**Request:**
```json
{
  "emailContent": "De: ejemplo@dominio.com\nPara: contacto@kokolinks.com\n\nContenido del correo...",
  "apiKey": "sk-..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response_body": "Muchas gracias por tu respuesta...",
    "domain": "ejemplo.com",
    "sender_email": "ejemplo@dominio.com",
    "sender_email_2": "",
    "kokolinks_email": "contacto@kokolinks.com",
    "prices": {
      "adult": 100,
      "igaming": 150,
      "crypto_forex": 120,
      "cbd": 80
    },
    "sponsored": "No",
    "notes": "Interesado en colaboración",
    "outreach": "Available"
  }
}
```

### POST /api/email/send

Envía datos al webhook de n8n.

**Request:**
```json
{
  "domain": "ejemplo.com",
  "sender_email": "contacto@ejemplo.com",
  "sender_email_2": "",
  "kokolinks_email": "contacto@kokolinks.com",
  "prices": {
    "adult": 100,
    "igaming": 150,
    "crypto_forex": 120,
    "cbd": 80
  },
  "sponsored": "No",
  "notes": "Notas adicionales",
  "outreach": "Available",
  "response_body": "Cuerpo de la respuesta..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Datos enviados exitosamente al webhook"
}
```

### GET /health

Health check del servidor.

**Response:**
```json
{
  "status": "OK",
  "message": "Outreach Kokolinks API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## 🛡️ Campos Extraídos

| Campo | Descripción |
|-------|-------------|
| **Domain** | Dominio del sitio web |
| **Sender Email** | Email principal del emisor |
| **Sender Email 2** | Segundo email (opcional) |
| **Kokolinks Email** | Email que recepcionó el correo |
| **Prices - Adult** | Precio para contenido adulto (0 si no acepta) |
| **Prices - iGaming** | Precio para apuestas/casinos (0 si no acepta) |
| **Prices - Crypto/Forex** | Precio para criptomonedas (0 si no acepta) |
| **Prices - CBD** | Precio para CBD (0 si no acepta) |
| **Sponsored** | Si acepta "Sponsored" (Yes/No) |
| **Notes** | Información adicional |
| **Outreach** | Available o Unavailable |

## 🌳 Casos de Uso del Árbol de Decisión

1. **Caso 1**: Cliente pregunta qué hacemos
2. **Caso 2**: Falta info sobre temáticas sensibles
3. **Caso 3**: Rechaza casino/apuestas
4. **Caso 4**: Links nofollow/patrocinados
5. **Caso 5**: Falta información específica
6. **Caso 6**: No acepta igaming
7. **Caso 7**: Condiciones no válidas

## 🔧 Tecnologías

### Backend
- **Node.js**: Runtime de JavaScript
- **Express**: Framework web
- **Axios**: Cliente HTTP
- **dotenv**: Manejo de variables de entorno

### Frontend
- **HTML5**: Estructura
- **CSS3**: Estilos (con animaciones)
- **JavaScript (Vanilla)**: Lógica del cliente

### IA
- **OpenAI GPT-4o**: Modelo de lenguaje

### Integración
- **n8n Webhook**: Para envío de datos

## 🐛 Troubleshooting

### El servidor no inicia

1. Verifica que Node.js esté instalado: `node --version`
2. Instala las dependencias: `npm install`
3. Revisa el puerto 3000 no esté en uso

### Error de OpenAI API

1. Verifica que tu API Key sea válida
2. Asegúrate de tener créditos en tu cuenta de OpenAI
3. Revisa que tengas acceso al modelo GPT-4o

### Error al enviar al webhook

1. Verifica la URL del webhook en `.env`
2. Comprueba tu conexión a internet
3. Revisa los logs del servidor

## 📝 Scripts Disponibles

```bash
# Iniciar en modo desarrollo (con nodemon)
npm run dev

# Iniciar en modo producción
npm start

# Instalar dependencias
npm install
```

## 📄 Licencia

ISC

## 👥 Autor

**Kokolinks** - Sistema de procesamiento automático de correos de outreach

---

**¿Preguntas o Problemas?** Contacta al equipo de desarrollo.

---

🎉 **¡Listo para usar!** Abre http://localhost:3000 y comienza a procesar correos.
