import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Orcamentos() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/orcamentos');
        setOrcamentos(response.data);
      } catch (err) {
        setErro('Erro ao carregar orçamentos');
      }
    };
    fetchData();
  }, []);

  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orçamentos</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Cliente</th>
            <th className="border px-4 py-2">Descrição</th>
            <th className="border px-4 py-2">Valor</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orcamentos.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{item.cliente?.nome}</td>
              <td className="border px-4 py-2">{item.descricao}</td>
              <td className="border px-4 py-2">R$ {item.valor.toFixed(2)}</td>
              <td className="border px-4 py-2">
                <Link to={`/orcamentos/editar/${item._id}`} className="text-blue-600 underline">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
