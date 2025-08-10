import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function NovoPedido() {
  const [clientes, setClientes] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [orcamentoId, setOrcamentoId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const resClientes = await api.get('/clientes');
        const resOrcamentos = await api.get('/orcamentos');
        setClientes(resClientes.data);
        setOrcamentos(resOrcamentos.data);
      } catch (err) {
        alert('Erro ao carregar dados');
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteId || !orcamentoId || !descricao || !valor || !data) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      await api.post('/pedidos', {
        cliente: clienteId,
        orcamento: orcamentoId,
        descricao,
        valor: parseFloat(valor),
        data
      });
      navigate('/pedidos');
    } catch (err) {
      alert('Erro ao cadastrar pedido');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Pedido</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} className="w-full border p-2 rounded" required>
          <option value="">Selecione um Cliente</option>
          {clientes.map((c) => (
            <option key={c._id} value={c._id}>{c.nome}</option>
          ))}
        </select>

        <select value={orcamentoId} onChange={(e) => setOrcamentoId(e.target.value)} className="w-full border p-2 rounded" required>
          <option value="">Selecione um Orçamento</option>
          {orcamentos.map((o) => (
            <option key={o._id} value={o._id}>{o.descricao}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Cadastrar</button>
      </form>
    </div>
  );
}