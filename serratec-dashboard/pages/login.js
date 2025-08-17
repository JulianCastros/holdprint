
import { useState } from 'react';
import { useRouter } from 'next/router';
import api from '../context/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, senha });
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Erro desconhecido');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 bg-white shadow">
      <h1 className="text-xl mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          className="w-full mb-4 p-2 border"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
