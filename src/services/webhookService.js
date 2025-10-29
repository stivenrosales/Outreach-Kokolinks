const axios = require('axios');

const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://n8n.truly.cl/webhook/90ddd17c-2893-4636-84d9-165e62006383';

/**
 * Envía datos al webhook de n8n
 */
const sendToWebhook = async (data) => {
    try {
        const response = await axios.post(WEBHOOK_URL, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Error al enviar al webhook:', error.response?.data || error.message);
        return {
            success: false,
            error: error.response?.data || error.message
        };
    }
};

module.exports = {
    sendToWebhook
};
