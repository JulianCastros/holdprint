// src/holdprint-dashboard/NovoEstoque.js

import React, { useState, useEffect } from 'react'
import api from '../api'

export default function NovoEstoque() {
  const [nome, setNome] = useState('')
  const [valor, setValor] = useState('')
  const [quantidade, setQuantidade] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lowStock, setLowStock] = useState(false)

  // Defina aqui o limite mínimo de estoque antes de exibir alerta
  const LIMIAR_BAIXO = 5

  useEffect(() => {
    const q = Number(quantidade)
    if (!isNaN(q) && q <= LIMIAR_BAIXO) {
      setLowStock(true)
    } else {
      setLowStock(false)
    }
  }, [quantidade])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const payload = {
        nome: nome.trim(),
        valor: Number(valor),
        quantidade: Number(quantidade)
      }

      const { data } = await api.post('/estoque', payload)
      console.log('Cadastrado com sucesso:', data)

      // limpar formulário
      setNome('')
      setValor('')
      setQuantidade('')
    } catch (err) {
      console.error('Erro ao cadastrar:', err.response || err.message)
      setError(
        err.response?.data?.message ||
        'Ocorreu um erro inesperado. Tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      {error && (
        <p className="mb-4 text-red-600">
          {error}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="nome" className="block mb-1">
            Nome do item
          </label>
          <input
            id="nome"
            type="text"
            placeholder="Caneta, Papel..."
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="valor" className="block mb-1">
            Valor unitário
          </label>
          <input
            id="valor"
            type="number"
            placeholder="Ex: 1.50"
            step="0.01"
            value={valor}
            onChange={e => setValor(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="quantidade" className="block mb-1">
            Quantidade em estoque
          </label>
          <input
            id="quantidade"
            type="number"
            placeholder="Ex: 10"
            min="0"
            step="1"
            value={quantidade}
            onChange={e => setQuantidade(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
          {lowStock && (
            <p className="mt-1 text-yellow-700">
              Atenção: estoque baixo ({quantidade} unidades restantes)!
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`
          mt-6 w-full py-2 text-white rounded
          ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
        `}
      >
        {loading ? 'Cadastrando...' : 'Cadastrar Estoque'}
      </button>
    </form>
  )
}
