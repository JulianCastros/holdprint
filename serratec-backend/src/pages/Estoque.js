import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Estoque() {
  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchEstoque = async () => {
      try {
        const response = await api.get('/estoque');
        setItens(response.data);
      } catch (err) {
        setErro('Erro ao buscar itens de estoque');
      } finally {
        setCarregando(false);
      }
    };

    fetchEstoque();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Estoque</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Produto</th>
            <th className="py-2 px-4">Quantidade</th>
            <th className="py-2 px-4">Preço (R$)</th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="py-2 px-4">{item.nome}</td>
              <td className="py-2 px-4">{item.quantidade}</td>
              <td className="py-2 px-4 text-right">{Number(item.preco).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
