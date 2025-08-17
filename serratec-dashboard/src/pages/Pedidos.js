import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [busca, setBusca] = useState('');
  const [clienteFiltro, setClienteFiltro] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const fetchPedidos = async () => {
    try {
      const res = await api.get('/pedidos');
      setPedidos(res.data);
      setCarregando(false);
    } catch (err) {
      setErro('Erro ao carregar pedidos');
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const filtrados = pedidos.filter((p) => {
    const data = new Date(p.data);
    const dentroDoPeriodo =
      (!dataInicio || data >= new Date(dataInicio)) &&
      (!dataFim || data <= new Date(dataFim));
    const clienteTexto = typeof p.cliente === 'object' ? p.cliente?.nome || '' : p.cliente || '';
    const clienteMatch = !clienteFiltro || clienteTexto.toLowerCase().includes(clienteFiltro.toLowerCase());
    const descricaoMatch = (p.descricao || '').toLowerCase().includes(busca.toLowerCase());
    const valorMatch =
      (!valorMin || p.valor >= parseFloat(valorMin)) &&
      (!valorMax || p.valor <= parseFloat(valorMax));

    return descricaoMatch && dentroDoPeriodo && clienteMatch && valorMatch;
  });

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <Link to="/pedidos/novo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Novo Pedido
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
        <input
          type="text"
          placeholder="Filtrar cliente..."
          className="p-2 border rounded"
          value={clienteFiltro}
          onChange={(e) => setClienteFiltro(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor Min"
          className="p-2 border rounded"
          value={valorMin}
          onChange={(e) => setValorMin(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor Max"
          className="p-2 border rounded"
          value={valorMax}
          onChange={(e) => setValorMax(e.target.value)}
        />
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
            <th className="p-2 border">Cliente</th>
            <th className="p-2 border">Descrição</th>
            <th className="p-2 border">Valor</th>
            <th className="p-2 border">Data</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border">
                {typeof item.cliente === 'object' ? item.cliente?.nome : item.cliente}
              </td>
              <td className="p-2 border">{item.descricao}</td>
              <td className="p-2 border">R$ {item.valor ? item.valor.toFixed(2) : '0.00'}</td>
              <td className="p-2 border">
                {item.data ? new Date(item.data).toLocaleDateString('pt-BR') : '-'}
              </td>
              <td className="p-2 border space-x-2">
                <Link to={`/pedidos/editar/${item._id}`} className="text-blue-600 underline">
                  Editar
                </Link>
                <button
                  onClick={async () => {
                    if (window.confirm('Deseja excluir este pedido?')) {
                      await api.delete(`/pedidos/${item._id}`);
                      fetchPedidos();
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
