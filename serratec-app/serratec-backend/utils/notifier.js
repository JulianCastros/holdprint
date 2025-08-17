const axios = require('axios');
require('dotenv').config();

const NOTIFIER_URL = process.env.NOTIFIER_URL;

async function notifyLowStock({ produto, restante, threshold }) {
  if (!NOTIFIER_URL) {
    console.warn('⚠️ NOTIFIER_URL não configurado no .env');
    return;
  }

  try {
    await axios.post(NOTIFIER_URL, {
      type: 'LOW_STOCK',
      produto,
      restante,
      threshold
    });
    console.log(`🔔 Notificação enviada: ${produto} abaixo de ${threshold}`);
  } catch (err) {
    console.error('❌ Erro ao enviar notificação:', err.message);
  }
}

module.exports = { notifyLowStock };
