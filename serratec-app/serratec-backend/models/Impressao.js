const mongoose = require('mongoose');

const ImpressaoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  },
  arquivo: {
    type: String,
    required: true
  },
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Impressao', ImpressaoSchema);
