import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await api.get('/pedidos');
        setPedidos(response.data);
      } catch (err) {
        setErro('Erro ao buscar pedidos');
      } finally {
        setCarregando(false);
      }
    };

    fetchPedidos();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Cliente</th>
            <th className="py-2 px-4">Descrição</th>
            <th className="py-2 px-4">Data</th>
            <th className="py-2 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido._id} className="border-t">
              <td className="py-2 px-4">{pedido.cliente?.nome ?? 'Sem cliente'}</td>
              <td className="py-2 px-4">{pedido.descricao}</td>
              <td className="py-2 px-4">{new Date(pedido.data).toLocaleDateString()}</td>
              <td className="py-2 px-4">{pedido.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
