const Relatorio = require('../models/Relatorio');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// CRUD - Criar
exports.criarRelatorio = async (req, res) => {
  try {
    const { titulo, conteudo } = req.body;
    if (!titulo || !conteudo) {
      return res.status(400).json({ erro: 'Título e conteúdo obrigatórios.' });
    }
    const novoRelatorio = new Relatorio({ titulo, conteudo });
    await novoRelatorio.save();
    res.status(201).json(novoRelatorio);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar relatório.', detalhes: err.message });
  }
};

// CRUD - Listar todos
exports.listarRelatorios = async (req, res) => {
  try {
    const relatorios = await Relatorio.find();
    res.json(relatorios);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar relatórios.' });
  }
};

// CRUD - Buscar por ID
exports.buscarRelatorioPorId = async (req, res) => {
  try {
    const relatorio = await Relatorio.findById(req.params.id);
    if (!relatorio) return res.status(404).json({ erro: 'Relatório não encontrado.' });
    res.json(relatorio);
  } catch (err) {
    res.status(400).json({ erro: 'ID inválido ou erro na busca.' });
  }
};

// CRUD - Deletar por ID
exports.deletarRelatorio = async (req, res) => {
  try {
    const relatorioRemovido = await Relatorio.findByIdAndDelete(req.params.id);
    if (!relatorioRemovido) return res.status(404).json({ erro: 'Relatório não encontrado.' });
    res.json({ mensagem: 'Relatório removido com sucesso.' });
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao remover relatório.' });
  }
};

// Gerar Relatório PDF
exports.gerarRelatorioPDF = async (req, res) => {
  try {
    const { titulo, tipo, filtros, conteudo } = req.body;
    if (!titulo || !tipo || !conteudo) {
      return res.status(400).json({ erro: 'Campos obrigatórios: titulo, tipo, conteudo.' });
    }

    const doc = new PDFDocument();
    const fileName = `${Date.now()}-${titulo.replace(/\s+/g, '_')}.pdf`;
    const filePath = path.join(__dirname, '..', 'uploads', fileName);

    // Cria pasta se não existir
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    doc.fontSize(20).text(titulo, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Tipo: ${tipo}`);
    doc.moveDown();
    doc.fontSize(12).text(`Conteúdo:`);
    doc.moveDown();
    doc.fontSize(10).text(conteudo);

    doc.end();

    stream.on('finish', async () => {
      const novoRelatorio = new Relatorio({
        titulo,
        tipo,
        filtros,
        criadoPor: req.user ? req.user._id : null,
        arquivoPDF: `/uploads/${fileName}`
      });

      await novoRelatorio.save();
      res.status(201).json(novoRelatorio);
    });

    stream.on('error', (err) => {
      res.status(500).json({ erro: 'Erro ao gerar ou salvar o PDF.' });
    });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao gerar relatório PDF.', detalhes: err.message });
  }
};