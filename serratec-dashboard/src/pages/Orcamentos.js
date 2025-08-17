import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Orcamentos() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const fetchOrcamentos = async () => {
    try {
      const res = await api.get('/orcamentos');
      setOrcamentos(res.data);
      setCarregando(false);
    } catch (err) {
      setErro('Erro ao carregar orçamentos');
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchOrcamentos();
  }, []);

  const orcamentosFiltrados = orcamentos.filter((orcamento) =>
    orcamento.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orçamentos</h1>
        <Link to="/orcamentos/novo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Novo Orçamento
        </Link>
      </div>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar por descrição..."
        className="p-2 border rounded mb-4 w-full max-w-md"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Descrição</th>
            <th className="p-2 border">Valor (R$)</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orcamentosFiltrados.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="p-2 border">{item.descricao}</td>
              <td className="p-2 border">R$ {item.valor.toFixed(2)}</td>
              <td className="p-2 border">
                {new Date(item.data).toLocaleDateString('pt-BR')}
              </td>
              <td className="p-2 border space-x-2">
               <Link to={`/orcamentos/editar/${item._id}`} className="text-blue-600 underline">Editar</Link>
                <button
                  onClick={async () => {
                    if (window.confirm('Tem certeza que deseja excluir este orçamento?')) {
                      await api.delete(`/orcamentos/${item._id}`);
                      fetchOrcamentos();
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