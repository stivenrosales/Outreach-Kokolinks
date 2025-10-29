const express = require('express');
const router = express.Router();
const { processEmail, sendData } = require('../controllers/emailController');

/**
 * POST /api/email/process
 * Procesa un email usando IA
 */
router.post('/process', processEmail);

/**
 * POST /api/email/send
 * Envía datos al webhook
 */
router.post('/send', sendData);

module.exports = router;
