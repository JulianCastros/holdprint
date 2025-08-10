import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <Link href="/">Dashboard</Link>
      <Link href="/clientes">Clientes</Link>
      {/* ... outras rotas */}
    </nav>
  );
}
