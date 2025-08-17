import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function EditarFinanceiro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lancamento, setLancamento] = useState({
    tipo: '',
    descricao: '',
    valor: '',
    data: ''
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchLancamento = async () => {
      try {
        const response = await api.get(`/financeiro/${id}`);
        setLancamento(response.data);
        setCarregando(false);
      } catch (err) {
        setErro('Erro ao carregar lançamento');
        setCarregando(false);
      }
    };

    fetchLancamento();
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
      setErro('Erro ao salvar alterações');
    }
  };

  if (carregando) return <p>Carregando lançamento...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Editar Lançamento</h2>
      {erro && <p className="text-red-500 mb-4">{erro}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="tipo"
          value={lancamento.tipo}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Selecione o tipo</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <input
          type="text"
          name="descricao"
          value={lancamento.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="valor"
          value={lancamento.valor}
          onChange={handleChange}
          placeholder="Valor"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="data"
          value={lancamento.data?.substring(0, 10) || ''}
          onChange={handleChange}
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
