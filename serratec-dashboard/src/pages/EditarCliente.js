import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nome: '',
    email: '',
    telefone: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await api.get(`/clientes/${id}`);
        setCliente(response.data);
      } catch (err) {
        console.error('Erro ao buscar cliente:', err);
        setErro('Erro ao buscar cliente.');
      }
    };

    fetchCliente();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/clientes/${id}`, cliente);
      navigate('/clientes');
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
      setErro('Erro ao atualizar cliente.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Editar Cliente</h2>
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          value={cliente.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={cliente.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="telefone"
          value={cliente.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
