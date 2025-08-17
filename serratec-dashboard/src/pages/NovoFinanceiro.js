import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function NovoFinanceiro() {
  const [clientes, setClientes] = useState([]);
  const [tipo, setTipo] = useState('entrada');
  const [clienteId, setClienteId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClientes() {
      try {
        const res = await api.get('/clientes');
        setClientes(res.data);
      } catch (err) {
        console.error('Erro ao carregar clientes:', err);
      }
    }
    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/financeiro', {
        tipo,
        cliente: clienteId,
        descricao,
        valor,
        data
      });
      navigate('/financeiro');
    } catch (err) {
      console.error('Erro ao cadastrar lançamento:', err);
      alert('Erro ao cadastrar lançamento financeiro');
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Novo Lançamento Financeiro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full border p-2 rounded" required>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} className="w-full border p-2 rounded" required>
          <option value="">Selecione um Cliente</option>
          {clientes.map((c) => (
            <option key={c._id} value={c._id}>{c.nome}</option>
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

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
