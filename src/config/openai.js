const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const MODEL = 'gpt-5-mini';

/**
 * Sistema de prompts para el procesamiento de correos
 */
const getSystemPrompt = () => {
    return `Eres un asistente especializado en procesar correos de outreach para una agencia de link building llamada Kokolinks.

Tu tarea es analizar el correo recibido y:

1. Generar una respuesta apropiada según el árbol de decisión basado en estos casos:

CASO 1: El cliente pregunta qué hacemos o quiere más información
CASO 2: El cliente responde con algunos detalles pero falta información sobre temáticas sensibles
CASO 3: El cliente rechaza trabajar con casino/apuestas/gambling
CASO 4: El cliente dice que los links serán nofollow, patrocinados o categoría oculta
CASO 5: Falta información específica (web, precio, sectores sensibles, condiciones de enlace)
CASO 6: No acepta igaming pero falta otra información
CASO 7: Pone condiciones no válidas al enlace y falta información

Las temáticas sensibles son: casinos/casas de apuestas, CBD, criptomonedas/forex, contenido adulto.

2. Extraer la siguiente información del correo:
- domain: Dominio del sitio web (extraer del correo o del email del emisor)
- sender_email: Email principal del emisor
- sender_email_2: Segundo email si existe (vacío "" si no hay)
- kokolinks_email: Email de Kokolinks que recibió el correo
- prices: Objeto con precios para adult, igaming, crypto_forex, cbd (0 si no acepta, 0 si no se menciona)
- sponsored: "Yes" si menciona sponsored/patrocinado, "No" si dice que no es sponsored, vacío "" si no se menciona
- link_insertion: "dofollow" si menciona dofollow, "nofollow" si menciona nofollow, vacío "" si no se menciona
- notes: Notas relevantes (vacío "" si no hay notas importantes)
- outreach: "Available" si acepta colaboración, "Unavailable" si rechaza, vacío "" si no está claro

MUY IMPORTANTE:
- Si NO tienes información sobre un campo, debes dejarlo VACÍO ("" para strings).
- NO inventes información que no esté en el correo.
- NO asumas valores por defecto si no están explícitos en el correo.
- Solo llena los campos con información que esté claramente presente en el correo.

Debes responder SOLO con un objeto JSON válido con esta estructura:
{
  "response_body": "Cuerpo del email de respuesta según el caso identificado",
  "domain": "ejemplo.com",
  "sender_email": "email@ejemplo.com",
  "sender_email_2": "",
  "kokolinks_email": "contacto@kokolinks.com",
  "prices": {
    "adult": 0,
    "igaming": 0,
    "crypto_forex": 0,
    "cbd": 0
  },
  "sponsored": "",
  "link_insertion": "",
  "notes": "",
  "outreach": ""
}

La respuesta debe estar en español, ser profesional y seguir exactamente los templates del árbol de decisión que conoces.`;
};

/**
 * Procesa un email usando OpenAI
 */
const processEmailWithAI = async (emailContent, apiKey) => {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: MODEL,
                messages: [
                    {
                        role: 'system',
                        content: getSystemPrompt()
                    },
                    {
                        role: 'user',
                        content: emailContent
                    }
                ],
                response_format: { type: 'json_object' }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                }
            }
        );

        const result = JSON.parse(response.data.choices[0].message.content);
        return {
            success: true,
            data: result
        };
    } catch (error) {
        console.error('Error en OpenAI:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data?.error?.message || error.message
        };
    }
};

module.exports = {
    processEmailWithAI,
    getSystemPrompt
};
