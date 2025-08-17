
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function NovoOrcamento() {
  const [clienteId, setClienteId] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [clientes, setClientes] = useState([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await api.get('/clientes');
        setClientes(res.data);
      } catch (err) {
        console.error('Erro ao carregar clientes:', err);
      }
    };
    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/orcamentos', {
        cliente: clienteId,
        descricao,
        valor: parseFloat(valor)
      });
      navigate('/orcamentos');
    } catch (err) {
      setErro('Erro ao cadastrar orçamento');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Novo Orçamento</h1>

      {erro && <p className="text-red-500 mb-2">{erro}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Cliente</label>
          <select
            className="w-full border p-2 rounded"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          >
            <option value="">Selecione um cliente</option>
            {clientes.map((c) => (
              <option key={c._id} value={c._id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block">Descrição</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Valor (R$)</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
