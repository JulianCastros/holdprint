// ====== src/pages/Financeiro.js ======
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Financeiro() {
  const [lancamentos, setLancamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  const [clienteFiltro, setClienteFiltro] = useState('');
  const [valorMin, setValorMin] = useState('');
  const [valorMax, setValorMax] = useState('');
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
    const data = new Date(l.data);
    const dentroDoPeriodo =
      (!dataInicio || data >= new Date(dataInicio)) &&
      (!dataFim || data <= new Date(dataFim));
    const tipoMatch = !tipoFiltro || l.tipo === tipoFiltro;
    const clienteMatch = !clienteFiltro || (l.cliente?.toLowerCase() || '').includes(clienteFiltro.toLowerCase());
    const descricaoMatch = l.descricao.toLowerCase().includes(busca.toLowerCase());
    const valorMatch = (!valorMin || l.valor >= parseFloat(valorMin)) && (!valorMax || l.valor <= parseFloat(valorMax));

    return tipoMatch && descricaoMatch && dentroDoPeriodo && clienteMatch && valorMatch;
  });

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Financeiro</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        <input type="text" placeholder="Buscar descrição..." className="p-2 border rounded" value={busca} onChange={(e) => setBusca(e.target.value)} />
        <input type="text" placeholder="Filtrar cliente..." className="p-2 border rounded" value={clienteFiltro} onChange={(e) => setClienteFiltro(e.target.value)} />
        <select className="p-2 border rounded" value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
          <option value="">Todos os Tipos</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>
        <input type="number" placeholder="Valor Min" className="p-2 border rounded" value={valorMin} onChange={(e) => setValorMin(e.target.value)} />
        <input type="number" placeholder="Valor Max" className="p-2 border rounded" value={valorMax} onChange={(e) => setValorMax(e.target.value)} />
        <input type="date" className="p-2 border rounded" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        <input type="date" className="p-2 border rounded" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tipo</th>
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
              <td className="p-2 border capitalize">{item.tipo}</td>
              <td className="p-2 border">{item.cliente || '-'}</td>
              <td className="p-2 border">{item.descricao}</td>
              <td className="p-2 border">R$ {item.valor.toFixed(2)}</td>
              <td className="p-2 border">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
              <td className="p-2 border space-x-2">
                <Link to={`/financeiro/editar/${item._id}`} className="text-blue-600 underline">Editar</Link>
                <button onClick={async () => {
                  if (window.confirm('Deseja excluir este lançamento?')) {
                    await api.delete(`/financeiro/${item._id}`);
                    fetchLancamentos();
                  }
                }} className="text-red-600 underline">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
