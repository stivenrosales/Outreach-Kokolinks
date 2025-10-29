# 📘 INSTRUCCIONES DE USO - Outreach Kokolinks

## 🎯 ¡La aplicación está lista y funcionando!

Tu servidor está corriendo en: **http://localhost:3000**

---

## ✅ Estado Actual

- ✅ Servidor Node.js iniciado correctamente
- ✅ Frontend funcionando
- ✅ API endpoints configurados
- ✅ Integración con OpenAI lista
- ✅ Webhook configurado

---

## 🚀 Cómo Usar la Aplicación

### Paso 1: Acceder a la Aplicación

Abre tu navegador y ve a: **http://localhost:3000**

### Paso 2: Configurar tu API Key de OpenAI

1. En la sección amarilla superior, ingresa tu API Key de OpenAI
2. La clave comienza con `sk-`
3. Se guardará automáticamente en tu navegador

**¿No tienes una API Key?**
- Visita: https://platform.openai.com/api-keys
- Crea una cuenta o inicia sesión
- Genera una nueva API Key

### Paso 3: Procesar un Correo

1. **Pega el correo completo** que recibiste en el área de texto grande
   - Incluye el emisor (De:)
   - Incluye el destinatario (Para:)
   - Incluye todo el contenido

2. **Haz clic en "✨ Procesar con IA"**
   - También puedes presionar `Ctrl + Enter`

3. **Espera unos segundos** mientras la IA procesa el correo

### Paso 4: Revisar la Respuesta

La IA te mostrará:

1. **Respuesta generada**: Un correo de respuesta profesional basado en el árbol de decisión
2. **Datos extraídos**: Toda la información estructurada del correo

### Paso 5: Editar si es Necesario

Puedes editar cualquier campo:
- Dominio
- Correos del emisor
- Precios por categoría
- Notas
- Estado de outreach

### Paso 6: Enviar a Sheet

Haz clic en **"📤 Enviar a Sheet"** para guardar los datos en tu Google Sheet vía n8n.

---

## 🔧 Comandos Útiles

### Iniciar la Aplicación

```bash
# Opción 1: Usando npm
cd "/Users/stivenkevinrosalescasas/Downloads/Outreach Kokolinks"
npm start

# Opción 2: Usando el script
./start.sh

# Opción 3: Modo desarrollo (con auto-reload)
npm run dev
```

### Detener la Aplicación

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

### Ver la Estructura del Proyecto

```bash
ls -la
```

---

## 📁 Archivos Importantes

| Archivo | Descripción |
|---------|-------------|
| `server.js` | Servidor principal de Node.js |
| `views/index.html` | Página principal de la aplicación |
| `public/css/styles.css` | Estilos de la interfaz |
| `public/js/app.js` | Lógica del frontend |
| `src/` | Código del backend (API) |
| `.env` | Variables de entorno (API Keys) |
| `package.json` | Dependencias del proyecto |
| `README.md` | Documentación completa |
| `START.md` | Guía de inicio rápido |

---

## 🎨 Características de la Interfaz

### Sección 1: Entrada de Email
- Área de texto grande para pegar correos
- Atajo de teclado: `Ctrl + Enter` para procesar

### Sección 2: Respuesta Generada
- Muestra la respuesta que la IA generó
- Botón para copiar al portapapeles
- Completamente editable

### Sección 3: Datos Extraídos
- 8 campos importantes extraídos automáticamente
- Todos los campos son editables
- Categorización de precios por temática sensible

---

## 🌳 Árbol de Decisión

La IA reconoce automáticamente 7 casos diferentes:

1. **Cliente pregunta qué hacemos** → Envía presentación completa
2. **Falta info sobre temáticas sensibles** → Pregunta por casinos, CBD, crypto, adult
3. **Rechaza casino/apuestas** → Explica que solo el link trataría el tema
4. **Links nofollow/patrocinados** → Pide que sean dofollow sin "sponsored"
5. **Falta información específica** → Pide los campos faltantes
6. **No acepta igaming pero falta otra info** → Combina respuesta
7. **Condiciones no válidas + falta info** → Negocia condiciones

---

## 🔒 Seguridad

- Tu API Key se guarda **solo en tu navegador** (localStorage)
- No se envía a ningún servidor excepto OpenAI
- El servidor backend no guarda las API Keys
- Puedes usar el archivo `.env` para configurar la API Key del servidor (opcional)

---

## ⚙️ Configuración Avanzada

### Cambiar el Puerto

Edita el archivo `.env`:

```env
PORT=3001
```

### Usar API Key del Servidor

Edita el archivo `.env` y agrega tu clave:

```env
OPENAI_API_KEY=sk-tu-clave-aqui
```

De esta forma no necesitarás ingresarla en la interfaz web.

### Cambiar la URL del Webhook

Edita el archivo `.env`:

```env
WEBHOOK_URL=tu-nueva-url-de-webhook
```

---

## ❓ Preguntas Frecuentes

### ¿Necesito dejar la terminal abierta?

Sí, mientras uses la aplicación, la terminal debe estar abierta con el servidor corriendo.

### ¿Puedo usar esto en otro ordenador?

Sí, solo copia la carpeta completa y ejecuta `npm install` en el nuevo ordenador.

### ¿Los datos se guardan?

Los datos se envían al webhook de n8n cuando haces clic en "Enviar a Sheet". No se guardan en el servidor local.

### ¿Cuánto cuesta usar la API de OpenAI?

GPT-5-mini tiene un costo por token. Cada correo procesado cuesta aproximadamente $0.01-0.05 USD. Verifica los precios actuales en OpenAI.

### ¿Funciona sin internet?

No, necesitas conexión a internet para:
- Comunicarte con la API de OpenAI
- Enviar datos al webhook de n8n

---

## 🆘 Soporte

### El servidor no inicia

```bash
# Verifica que Node.js esté instalado
node --version

# Reinstala las dependencias
rm -rf node_modules
npm install

# Inicia nuevamente
npm start
```

### Error de puerto en uso

Cambia el puerto en `.env` o detén el proceso que usa el puerto 3000:

```bash
lsof -ti:3000 | xargs kill
```

### Error con OpenAI API

- Verifica que tu API Key sea válida
- Asegúrate de tener créditos en tu cuenta
- Revisa que tengas acceso a GPT-5-mini

---

## 🎉 ¡Listo!

Tu aplicación Outreach Kokolinks está **completamente funcional** y lista para procesar correos.

**URL:** http://localhost:3000

**Documentación completa:** [README.md](README.md)

---

**Desarrollado para Kokolinks** | v1.0.0
