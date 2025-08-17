import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EditarEstoque() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    nome: '',
    descricao: '',
    quantidade: '',
    valor: '',
    categoria: '',
    localizacao: '',
    data: ''
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await api.get(`/estoque/${id}`);
        setItem(response.data);
        setCarregando(false);
      } catch (err) {
        setErro('Erro ao carregar item do estoque');
        setCarregando(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/estoque/${id}`, item);
      navigate('/estoque');
    } catch (err) {
      setErro('Erro ao salvar alterações');
    }
  };

  if (carregando) return <p>Carregando item...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Editar Item do Estoque</h2>
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nome"
          value={item.nome}
          onChange={handleChange}
          placeholder="Nome do item"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="descricao"
          value={item.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
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
          type="text"
          name="categoria"
          value={item.categoria}
          onChange={handleChange}
          placeholder="Categoria"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="localizacao"
          value={item.localizacao}
          onChange={handleChange}
          placeholder="Localização"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="data"
          value={item.data?.substring(0, 10) || ''}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
