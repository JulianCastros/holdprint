import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [resumo, setResumo] = useState({
    totalClientes: 0,
    totalOrcamentos: 0,
    totalPedidos: 0,
    totalReceitas: 0,
    totalDespesas: 0,
    totalEstoque: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarResumo() {
      try {
        const { data } = await api.get('/dashboard');
        setResumo(data);
      } catch (error) {
        console.error(
          'Erro ao buscar resumo do painel:',
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    }

    carregarResumo();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Carregando dados do painel...
      </p>
    );
  }

  const formatBRL = value =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {/* cartão de clientes */}
      {/* ... */}
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold text-gray-700">Receitas</h2>
        <p className="text-3xl font-bold text-green-600">
          {formatBRL(resumo.totalReceitas)}
        </p>
      </div>
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold text-gray-700">Despesas</h2>
        <p className="text-3xl font-bold text-red-600">
          {formatBRL(resumo.totalDespesas)}
        </p>
      </div>
      {/* demais cartões */}
    </div>
  );
}
