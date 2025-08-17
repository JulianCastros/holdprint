import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EditarPedido() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState({
    cliente: '',
    orcamento: '',
    descricao: '',
    valor: '',
    data: ''
  });

  const [clientes, setClientes] = useState([]);
  const [orcamentos, setOrcamentos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resPedido = await api.get(`/pedidos/${id}`);
        setPedido(resPedido.data);

        const resClientes = await api.get('/clientes');
        setClientes(resClientes.data);

        const resOrcamentos = await api.get('/orcamentos');
        setOrcamentos(resOrcamentos.data);
      } catch (err) {
        alert('Erro ao carregar dados do pedido.');
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setPedido({ ...pedido, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pedidos/${id}`, pedido);
      navigate('/pedidos');
    } catch (err) {
      alert('Erro ao salvar alterações do pedido.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Pedido</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          name="cliente"
          value={pedido.cliente}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecione um Cliente</option>
          {clientes.map((c) => (
            <option key={c._id} value={c._id}>{c.nome}</option>
          ))}
        </select>

        <select
          name="orcamento"
          value={pedido.orcamento}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecione um Orçamento</option>
          {orcamentos.map((o) => (
            <option key={o._id} value={o._id}>{o.descricao}</option>
          ))}
        </select>

        <input
          type="text"
          name="descricao"
          value={pedido.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="valor"
          value={pedido.valor}
          onChange={handleChange}
          placeholder="Valor"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="data"
          value={pedido.data?.split('T')[0] || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </div>
  );
}
