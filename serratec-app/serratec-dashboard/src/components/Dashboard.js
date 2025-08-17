// src/Dashboard.js

import React, { useEffect, useState } from 'react'
import api from './api'
import socket from './socket'

export default function Dashboard() {
  const [resumo, setResumo] = useState({
    totalClientes: 0,
    totalOrcamentos: 0,
    totalPedidos: 0,
    totalReceitas: 0,
    totalDespesas: 0,
    totalEstoque: 0
  })
  const [loading, setLoading] = useState(true)
  const [lowAlerts, setLowAlerts] = useState([])

  useEffect(() => {
    // 1️⃣ Busca inicial dos dados do dashboard
    async function fetchResumo() {
      try {
        const { data } = await api.get('/dashboard')
        setResumo({
          totalClientes: data.totalClientes,
          totalOrcamentos: data.totalOrcamentos,
          totalPedidos: data.totalPedidos,
          // mapeia os campos financeiros
          totalReceitas: data.totalEntrada,
          totalDespesas: data.totalSaida,
          // total de itens em estoque
          totalEstoque: data.totalItensEstoque
        })
      } catch (err) {
        console.error(
          'Erro ao buscar resumo do painel:',
          err.response?.data?.message || err.message
        )
      } finally {
        setLoading(false)
      }
    }
    fetchResumo()

    // 2️⃣ Conecta ao Socket.io
    socket.connect()

    // 3️⃣ Escuta eventos de atualização de estoque
    socket.on('stockUpdate', update => {
      if (update.isLowStock) {
        setLowAlerts(alerts => [
          ...alerts,
          `Atenção: "${update.nome}" com apenas ${update.quantidade} unidades no estoque!`
        ])
      }
    })

    // 4️⃣ Cleanup ao desmontar
    return () => {
      socket.off('stockUpdate')
      socket.disconnect()
    }
  }, [])

  // Formata valores em BRL
  const formatBRL = value =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Carregando dados do painel...
      </p>
    )
  }

  return (
    <div className="p-4">
      {/* 1. Alertas de estoque baixo */}
      {lowAlerts.map((msg, idx) => (
        <div
          key={idx}
          className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded"
        >
          {msg}
        </div>
      ))}

      {/* 2. Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Clientes */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Clientes
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {resumo.totalClientes}
          </p>
        </div>

        {/* Orçamentos */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Orçamentos
          </h2>
          <p className="text-3xl font-bold text-indigo-600">
            {resumo.totalOrcamentos}
          </p>
        </div>

        {/* Pedidos */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Pedidos
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {resumo.totalPedidos}
          </p>
        </div>

        {/* Receitas */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Receitas
          </h2>
          <p className="text-3xl font-bold text-green-500">
            {formatBRL(resumo.totalReceitas)}
          </p>
        </div>

        {/* Despesas */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Despesas
          </h2>
          <p className="text-3xl font-bold text-red-500">
            {formatBRL(resumo.totalDespesas)}
          </p>
        </div>

        {/* Estoque */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Itens em Estoque
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            {resumo.totalEstoque}
          </p>
        </div>
      </div>
    </div>
  )
}
