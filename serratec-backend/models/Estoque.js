// src/models/Estoque.js

const mongoose = require('mongoose');

const LOW_STOCK_THRESHOLD = Number(process.env.LOW_STOCK_THRESHOLD) || 5;

const estoqueSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do item é obrigatório'],
      trim: true
    },
    valor: {
      type: Number,
      required: [true, 'O valor unitário é obrigatório'],
      min: [0, 'O valor não pode ser negativo']
    },
    quantidade: {
      type: Number,
      required: [true, 'A quantidade em estoque é obrigatória'],
      min: [0, 'Quantidade não pode ser negativa'],
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual: retorna true se estiver abaixo (ou igual) do limiar
estoqueSchema.virtual('isLowStock').get(function () {
  return this.quantidade <= LOW_STOCK_THRESHOLD;
});

// Método de instância: pode receber um threshold customizado
estoqueSchema.methods.checkLowStock = function (threshold = LOW_STOCK_THRESHOLD) {
  return this.quantidade <= threshold;
};

module.exports = mongoose.model('Estoque', estoqueSchema);
