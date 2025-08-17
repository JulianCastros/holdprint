import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Clientes from './pages/Clientes';
import Orcamentos from './pages/Orcamentos';
import Pedidos from './pages/Pedidos';
import Financeiro from './pages/Financeiro';
import Estoque from './pages/Estoque';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/orcamentos" element={<Orcamentos />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/estoque" element={<Estoque />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;