import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Estoque() {
  const [itens, setItens] = useState([]);
  const [busca, setBusca] = useState('');
  const [quantidadeMin, setQuantidadeMin] = useState('');
  const [quantidadeMax, setQuantidadeMax] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const fetchEstoque = async () => {
    try {
      const res = await api.get('/estoque');
      setItens(res.data);
      setCarregando(false);
    } catch (err) {
      setErro('Erro ao carregar estoque');
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchEstoque();
  }, []);

  const filtrados = itens.filter((item) => {
    const data = new Date(item.data);
    const dataOk =
      (!dataInicio || data >= new Date(dataInicio)) &&
      (!dataFim || data <= new Date(dataFim));
    const descricaoOk = item.produto?.toLowerCase().includes(busca.toLowerCase());
    const quantidadeOk =
      (!quantidadeMin || item.quantidade >= parseFloat(quantidadeMin)) &&
      (!quantidadeMax || item.quantidade <= parseFloat(quantidadeMax));
    const valorOk =
      (!valorMin || item.valor >= parseFloat(valorMin)) &&
      (!valorMax || item.valor <= parseFloat(valorMax));

    return descricaoOk && quantidadeOk && valorOk && dataOk;
  });

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Estoque</h1>
        <Link to="/estoque/novo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Novo Estoque
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Buscar produto..." className="p-2 border rounded" value={busca} onChange={(e) => setBusca(e.target.value)} />
        <input type="number" placeholder="Qtd Min" className="p-2 border rounded" value={quantidadeMin} onChange={(e) => setQuantidadeMin(e.target.value)} />
        <input type="number" placeholder="Qtd Max" className="p-2 border rounded" value={quantidadeMax} onChange={(e) => setQuantidadeMax(e.target.value)} />
        <input type="number" placeholder="Valor Min" className="p-2 border rounded" value={valorMin} onChange={(e) => setValorMin(e.target.value)} />
        <input type="number" placeholder="Valor Max" className="p-2 border rounded" value={valorMax} onChange={(e) => setValorMax(e.target.value)} />
        <input type="date" className="p-2 border rounded" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        <input type="date" className="p-2 border rounded" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Produto</th>
            <th className="p-2 border">Quantidade</th>
            <th className="p-2 border">Valor</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border">{item.produto}</td>
              <td className="p-2 border">{item.quantidade}</td>
              <td className="p-2 border">R$ {typeof item.valor === 'number' ? item.valor.toFixed(2) : '0,00'}</td>
              <td className="p-2 border">{item.data ? new Date(item.data).toLocaleDateString('pt-BR') : '-'}</td>
              <td className="p-2 border space-x-2">
                <Link to={`/estoque/editar/${item._id}`} className="text-blue-600 underline">Editar</Link>
                <button
                  onClick={async () => {
                    if (window.confirm('Deseja excluir este item?')) {
                      await api.delete(`/estoque/${item._id}`);
                      fetchEstoque();
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
