const { processEmailWithAI } = require('../config/openai');
const { sendToWebhook } = require('../services/webhookService');

/**
 * Procesa un email usando IA
 */
const processEmail = async (req, res) => {
    try {
        const { emailContent } = req.body;

        if (!emailContent) {
            return res.status(400).json({
                success: false,
                error: 'El contenido del email es requerido'
            });
        }

        // Usar API Key del servidor desde variables de entorno
        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                success: false,
                error: 'API Key de OpenAI no configurada en el servidor'
            });
        }

        // Procesar con OpenAI
        const result = await processEmailWithAI(emailContent, apiKey);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                error: result.error
            });
        }

        return res.json({
            success: true,
            data: result.data
        });
    } catch (error) {
        console.error('Error en processEmail:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al procesar el email'
        });
    }
};

/**
 * Envía datos al webhook
 */
const sendData = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({
                success: false,
                error: 'Los datos son requeridos'
            });
        }

        // Enviar al webhook
        const result = await sendToWebhook(data);

        if (!result.success) {
            return res.status(500).json({
                success: false,
                error: result.error
            });
        }

        return res.json({
            success: true,
            message: 'Datos enviados exitosamente al webhook'
        });
    } catch (error) {
        console.error('Error en sendData:', error);
        return res.status(500).json({
            success: false,
            error: 'Error al enviar los datos'
        });
    }
};

module.exports = {
    processEmail,
    sendData
};
