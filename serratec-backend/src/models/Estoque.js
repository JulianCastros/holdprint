import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/estoque');
        setProdutos(response.data);
      } catch (err) {
        setErro('Erro ao carregar estoque');
      }
    };
    fetchData();
  }, []);

  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Estoque</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Produto</th>
            <th className="border px-4 py-2">Quantidade</th>
            <th className="border px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{item.nome}</td>
              <td className="border px-4 py-2">{item.quantidade}</td>
              <td className="border px-4 py-2">
                <Link to={`/estoque/editar/${item._id}`} className="text-blue-600 underline">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
