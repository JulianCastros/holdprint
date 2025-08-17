import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Financeiro() {
  const [lancamentos, setLancamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const fetchLancamentos = async () => {
    try {
      const res = await api.get('/financeiro');
      setLancamentos(res.data);
      setCarregando(false);
    } catch (err) {
      setErro('Erro ao carregar financeiro');
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchLancamentos();
  }, []);

  const filtrados = lancamentos.filter((l) => {
    const dentroDoPeriodo =
      (!dataInicio || new Date(l.data) >= new Date(dataInicio)) &&
      (!dataFim || new Date(l.data) <= new Date(dataFim));
    const tipoMatch = !tipoFiltro || l.tipo === tipoFiltro;
    const descricaoMatch = l.descricao.toLowerCase().includes(busca.toLowerCase());
    return tipoMatch && descricaoMatch && dentroDoPeriodo;
  });

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Financeiro</h1>
        <Link to="/financeiro/novo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Novo Lançamento
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar descrição..."
          className="p-2 border rounded"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select
          className="p-2 border rounded"
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
        >
          <option value="">Todos os Tipos</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input
          type="date"
          className="p-2 border rounded"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
        <input
          type="date"
          className="p-2 border rounded"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tipo</th>
            <th className="p-2 border">Descrição</th>
            <th className="p-2 border">Valor</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border capitalize">{item.tipo}</td>
              <td className="p-2 border">{item.descricao}</td>
              <td className="p-2 border">R$ {item.valor.toFixed(2)}</td>
              <td className="p-2 border">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
              <td className="p-2 border space-x-2">
                <Link to={`/financeiro/editar/${item._id}`} className="text-blue-600 underline">
                  Editar
                </Link>
                <button
                  onClick={async () => {
                    if (window.confirm('Deseja excluir este lançamento?')) {
                      await api.delete(`/financeiro/${item._id}`);
                      fetchLancamentos();
                    }
                  }}
                  className="text-red-600 underline"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}