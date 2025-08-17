const mongoose = require('mongoose');

const PrintJobSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  status: { type: String, enum: ['pendente', 'em andamento', 'concluída'], default: 'pendente' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PrintJob', PrintJobSchema);