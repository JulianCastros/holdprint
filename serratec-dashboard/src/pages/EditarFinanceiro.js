import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function EditarFinanceiro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lancamento, setLancamento] = useState({
    cliente: '',
    descricao: '',
    tipo: '',
    valor: '',
    data: ''
  });
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/financeiro/${id}`);
        const data = res.data;

        // Garante que a data esteja no formato compatível com o input date
        setLancamento({
          cliente: data.cliente || '',
          descricao: data.descricao || '',
          tipo: data.tipo || '',
          valor: data.valor || '',
          data: data.data?.substring(0, 10) || ''
        });
      } catch (err) {
        console.error('Erro ao buscar o lançamento:', err);
        setErro('Não foi possível carregar os dados do lançamento.');
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setLancamento({ ...lancamento, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/financeiro/${id}`, lancamento);
      navigate('/financeiro');
    } catch (err) {
      console.error('Erro ao salvar alterações:', err);
      setErro('Erro ao salvar alterações. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Editar Lançamento</h1>
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="cliente"
          value={lancamento.cliente}
          onChange={handleChange}
          placeholder="Cliente"
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="descricao"
          value={lancamento.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
        />
        <select
          name="tipo"
          value={lancamento.tipo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Selecione o tipo</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input
          type="number"
          name="valor"
          value={lancamento.valor}
          onChange={handleChange}
          placeholder="Valor"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          name="data"
          value={lancamento.data}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}
