import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const fetchClientes = async () => {
    try {
      const res = await api.get('/clientes');
      setClientes(res.data);
      setCarregando(false);
    } catch (err) {
      setErro('Erro ao carregar clientes');
      setCarregando(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const filtrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase()) ||
    c.email.toLowerCase().includes(busca.toLowerCase()) ||
    c.telefone?.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-500">{erro}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link to="/clientes/novo" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Novo Cliente
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nome, email ou telefone..."
          className="p-2 border rounded w-full"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Telefone</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map((cliente) => (
            <tr key={cliente._id}>
              <td className="p-2 border">{cliente.nome}</td>
              <td className="p-2 border">{cliente.email}</td>
              <td className="p-2 border">{cliente.telefone}</td>
              <td className="p-2 border space-x-2">
                <Link to={`/clientes/editar/${cliente._id}`} className="text-blue-600 underline">Editar</Link>
                <button
                  onClick={async () => {
                    if (window.confirm('Deseja excluir este cliente?')) {
                      await api.delete(`/clientes/${cliente._id}`);
                      fetchClientes();
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
