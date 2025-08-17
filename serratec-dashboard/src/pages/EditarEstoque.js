import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EditarEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    produto: '',
    quantidade: '',
    valor: '',
    data: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await api.get(`/estoque/${id}`);
        const data = res.data;
        setItem({
          produto: data.produto || '',
          quantidade: data.quantidade || '',
          valor: data.valor || '',
          data: data.data?.substring(0, 10) || ''
        });
      } catch (err) {
        console.error('Erro ao carregar item do estoque:', err);
        setErro('Erro ao carregar item do estoque.');
      }
    };
    fetchItem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/estoque/${id}`, item);
      navigate('/estoque');
    } catch (err) {
      console.error('Erro ao salvar alterações:', err);
      setErro('Erro ao salvar alterações.');
    }
  };

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Editar Item do Estoque</h1>
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="produto"
          value={item.produto}
          onChange={handleChange}
          placeholder="Produto"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="quantidade"
          value={item.quantidade}
          onChange={handleChange}
          placeholder="Quantidade"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="valor"
          value={item.valor}
          onChange={handleChange}
          placeholder="Valor"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="date"
          name="data"
          value={item.data}
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
