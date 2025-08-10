import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Financeiro() {
  const [lancamentos, setLancamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchFinanceiro = async () => {
      try {
        const response = await api.get('/financeiro');
        setLancamentos(response.data);
      } catch (err) {
        setErro('Erro ao buscar lançamentos financeiros');
      } finally {
        setCarregando(false);
      }
    };

    fetchFinanceiro();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financeiro</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Descrição</th>
            <th className="py-2 px-4">Tipo</th>
            <th className="py-2 px-4">Valor (R$)</th>
            <th className="py-2 px-4">Data</th>
          </tr>
        </thead>
        <tbody>
          {lancamentos.map((lancamento) => (
            <tr key={lancamento._id} className="border-t">
              <td className="py-2 px-4">{lancamento.descricao}</td>
              <td className="py-2 px-4 capitalize">{lancamento.tipo}</td>
              <td className="py-2 px-4 text-right">{Number(lancamento.valor).toFixed(2)}</td>
              <td className="py-2 px-4">{new Date(lancamento.data).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
