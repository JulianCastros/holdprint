const PrintJob = require('../models/PrintJob');

exports.createPrintJob = async (req, res) => {
  try {
    const { fileName, fileUrl } = req.body;
    if (!fileName || !fileUrl) {
      return res.status(400).json({ message: 'Nome e URL do arquivo são obrigatórios.' });
    }
    const printJob = new PrintJob({
      user: req.usuario._id,
      fileName,
      fileUrl
    });
    await printJob.save();
    res.status(201).json({ message: 'Impressão criada com sucesso.', printJob });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar impressão.' });
  }
};

exports.getUserPrintJobs = async (req, res) => {
  try {
    const printJobs = await PrintJob.find({ user: req.usuario._id }).sort({ createdAt: -1 });
    res.status(200).json(printJobs);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar impressões.' });
  }
};

exports.updatePrintStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatus = ['pendente', 'em andamento', 'concluída'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: 'Status inválido.' });
    }
    const updated = await PrintJob.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Impressão não encontrada.' });
    res.status(200).json({ message: 'Status atualizado.', printJob: updated });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar status.' });
  }
};

exports.getAllPrintJobs = async (req, res) => {
  try {
    const printJobs = await PrintJob.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.status(200).json(printJobs);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar todas as impressões.' });
  }
};