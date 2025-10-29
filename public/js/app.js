// API Base URL
const API_BASE = '/api/email';

// Estado de la aplicación
const appState = {
    processing: false,
    currentData: null
};

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    console.log('🚀 Outreach Kokolinks App Inicializada');
});

/**
 * Configurar event listeners
 */
function setupEventListeners() {
    // Procesar email
    document.getElementById('processBtn').addEventListener('click', processEmail);

    // Enviar a webhook
    document.getElementById('sendBtn').addEventListener('click', sendToWebhook);

    // Enter key en el textarea
    document.getElementById('emailInput').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            processEmail();
        }
    });
}

/**
 * Mostrar alerta
 */
function showAlert(message, type = 'info') {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = `alert alert-${type} active`;

    setTimeout(() => {
        alert.classList.remove('active');
    }, 5000);
}

/**
 * Mostrar/ocultar loader
 */
function toggleLoading(show) {
    const loading = document.getElementById('loading');
    if (show) {
        loading.classList.add('active');
    } else {
        loading.classList.remove('active');
    }
}

/**
 * Procesar email con IA
 */
async function processEmail() {
    if (appState.processing) {
        showAlert('Ya hay un proceso en curso...', 'warning');
        return;
    }

    const emailInput = document.getElementById('emailInput').value.trim();

    // Validaciones
    if (!emailInput) {
        showAlert('Por favor, pega el correo a procesar', 'error');
        document.getElementById('emailInput').focus();
        return;
    }

    appState.processing = true;
    toggleLoading(true);
    document.getElementById('processBtn').disabled = true;

    try {
        const response = await fetch(`${API_BASE}/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                emailContent: emailInput
            })
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Error al procesar el correo');
        }

        // Guardar datos en el estado
        appState.currentData = result.data;

        // Mostrar respuesta generada
        document.getElementById('responseBody').value = result.data.response_body || '';
        document.getElementById('responseSection').classList.remove('hidden');

        // Llenar campos extraídos
        populateExtractedData(result.data);

        // Mostrar sección de datos extraídos
        document.getElementById('extractedDataSection').classList.remove('hidden');

        // Mensaje de éxito
        showAlert('¡Correo procesado exitosamente con IA!', 'success');

        // Scroll suave a resultados
        setTimeout(() => {
            document.getElementById('responseSection').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300);

    } catch (error) {
        console.error('Error:', error);
        showAlert(`Error: ${error.message}`, 'error');
    } finally {
        appState.processing = false;
        toggleLoading(false);
        document.getElementById('processBtn').disabled = false;
    }
}

/**
 * Llenar campos con datos extraídos
 */
function populateExtractedData(data) {
    document.getElementById('domain').value = data.domain || '';
    document.getElementById('senderEmail').value = data.sender_email || '';
    document.getElementById('senderEmail2').value = data.sender_email_2 || '';
    document.getElementById('kokolinksEmail').value = data.kokolinks_email || '';

    // Precios
    document.getElementById('priceAdult').value = data.prices?.adult || 0;
    document.getElementById('priceIgaming').value = data.prices?.igaming || 0;
    document.getElementById('priceCrypto').value = data.prices?.crypto_forex || 0;
    document.getElementById('priceCBD').value = data.prices?.cbd || 0;

    // Otros campos - mantener vacío si no hay información
    document.getElementById('sponsored').value = data.sponsored || '';
    document.getElementById('linkInsertion').value = data.link_insertion || '';
    document.getElementById('notes').value = data.notes || '';
    document.getElementById('outreach').value = data.outreach || '';
}

/**
 * Enviar datos al webhook
 */
async function sendToWebhook() {
    // Recopilar datos del formulario
    const data = {
        domain: document.getElementById('domain').value,
        sender_email: document.getElementById('senderEmail').value,
        sender_email_2: document.getElementById('senderEmail2').value,
        kokolinks_email: document.getElementById('kokolinksEmail').value,
        prices: {
            adult: parseInt(document.getElementById('priceAdult').value) || 0,
            igaming: parseInt(document.getElementById('priceIgaming').value) || 0,
            crypto_forex: parseInt(document.getElementById('priceCrypto').value) || 0,
            cbd: parseInt(document.getElementById('priceCBD').value) || 0
        },
        sponsored: document.getElementById('sponsored').value,
        link_insertion: document.getElementById('linkInsertion').value,
        notes: document.getElementById('notes').value,
        outreach: document.getElementById('outreach').value,
        response_body: document.getElementById('responseBody').value
    };

    // Validar datos mínimos
    if (!data.domain || !data.sender_email) {
        showAlert('Por favor, completa al menos el Dominio y el Correo del Emisor', 'warning');
        return;
    }

    document.getElementById('sendBtn').disabled = true;

    try {
        const response = await fetch(`${API_BASE}/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || 'Error al enviar datos');
        }

        showAlert('✅ Datos enviados exitosamente al Sheet', 'success');

        // Preguntar si desea limpiar el formulario
        setTimeout(() => {
            if (confirm('¿Deseas limpiar el formulario para procesar otro correo?')) {
                resetForm();
            }
        }, 1500);

    } catch (error) {
        console.error('Error:', error);
        showAlert(`Error al enviar: ${error.message}`, 'error');
    } finally {
        document.getElementById('sendBtn').disabled = false;
    }
}

/**
 * Resetear formulario
 */
function resetForm() {
    // Limpiar textarea de email
    document.getElementById('emailInput').value = '';

    // Limpiar respuesta
    document.getElementById('responseBody').value = '';

    // Limpiar campos extraídos
    document.getElementById('domain').value = '';
    document.getElementById('senderEmail').value = '';
    document.getElementById('senderEmail2').value = '';
    document.getElementById('kokolinksEmail').value = '';
    document.getElementById('priceAdult').value = '0';
    document.getElementById('priceIgaming').value = '0';
    document.getElementById('priceCrypto').value = '0';
    document.getElementById('priceCBD').value = '0';
    document.getElementById('sponsored').value = '';
    document.getElementById('linkInsertion').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('outreach').value = '';

    // Ocultar secciones
    document.getElementById('responseSection').classList.add('hidden');
    document.getElementById('extractedDataSection').classList.add('hidden');

    // Limpiar estado
    appState.currentData = null;

    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });

    showAlert('Formulario limpiado. Listo para procesar un nuevo correo', 'info');
}

/**
 * Copiar respuesta al portapapeles
 */
function copyResponse() {
    const responseBody = document.getElementById('responseBody');
    responseBody.select();
    document.execCommand('copy');
    showAlert('Respuesta copiada al portapapeles', 'success');
}

// Exponer funciones globalmente si es necesario
window.processEmail = processEmail;
window.sendToWebhook = sendToWebhook;
window.copyResponse = copyResponse;
window.resetForm = resetForm;
