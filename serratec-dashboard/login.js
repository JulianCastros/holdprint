import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    // sua lógica de autenticação
    localStorage.setItem('token', 'seu-token');
    router.push('/');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
        className="block w-full mb-4 p-2 border"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2">
        Entrar
      </button>
    </form>
  );
}
