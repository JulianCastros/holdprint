import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function EditarOrcamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orcamento, setOrcamento] = useState({ descricao: '', valor: '', data: '' });
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get(`/orcamentos/${id}`);
        setOrcamento(res.data);
      } catch (err) {
        setErro('Erro ao carregar orçamento');
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setOrcamento({ ...orcamento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/orcamentos/${id}`, orcamento);
      navigate('/orcamentos');
    } catch (err) {
      setErro('Erro ao salvar orçamento');
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Editar Orçamento</h2>
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="descricao"
          value={orcamento.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="valor"
          value={orcamento.valor}
          onChange={handleChange}
          placeholder="Valor"
          type="number"
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="data"
          value={orcamento.data?.split('T')[0] || ''}
          onChange={handleChange}
          type="date"
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Salvar
          </button>
          <Link to="/orcamentos" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
