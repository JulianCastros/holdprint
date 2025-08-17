import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/clientes', label: 'Clientes' },
    { path: '/orcamentos', label: 'Orçamentos' },
    { path: '/pedidos', label: 'Pedidos' },
    { path: '/financeiro', label: 'Financeiro' },
    { path: '/estoque', label: 'Estoque' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-wide">Holdprint</h1>
        <div className="flex items-center gap-6">
          <ul className="flex gap-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 ${
                    location.pathname === item.path ? 'bg-gray-900' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 text-sm transition"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
}
