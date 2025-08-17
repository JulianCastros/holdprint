import { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import api from '../context/axios';

export default function Dashboard() {
  const socket = useContext(SocketContext);
  const [items, setItems] = useState([]);

  // 1) Fetch inicial
  useEffect(() => {
    api.get('/estoque')
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  // 2) Atualizações em tempo real
  useEffect(() => {
    const handler = update => {
      setItems(prev => {
        const idx = prev.findIndex(i => i._id === update._id);
        if (idx >= 0) {
          const copy = [...prev];
          copy[idx] = update;
          return copy;
        }
        return [update, ...prev];
      });
    };

    socket.on('stockUpdate', handler);
    return () => socket.off('stockUpdate', handler);
  }, [socket]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard de Estoque</h1>
      <table className="w-full table-auto">
        <thead>
          <tr><th>Produto</th><th>Qtd</th><th>Status</th></tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id} className={item.isLowStock ? 'bg-red-100' : ''}>
              <td>{item.nome}</td>
              <td>{item.quantidade}</td>
              <td>
                {item.isLowStock ? '🔴 Baixo' : '🟢 OK'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
