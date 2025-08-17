import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SocketContext } from './SocketContext';
import socket from './socket';

import Navbar from './components/Navbar';
import RotaPrivada from './components/RotaPrivada';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Socket conectado:', socket.id);
    });

    socket.on('disconnect', reason => {
      console.log('Socket desconectado:', reason);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RotaPrivada><Dashboard /></RotaPrivada>} />
          </Routes>
        </div>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
