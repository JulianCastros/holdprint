// pages/_app.js
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { SocketContext } from '../context/SocketContext';
import socket from '../context/socket';
import RotaPrivada from '../components/RotaPrivada';
import api from '../context/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const publicRoutes = ['/login'];

  // Conexão WebSocket
  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);

  const isPublic = publicRoutes.includes(router.pathname);

  return (
    <SocketContext.Provider value={socket}>
      {!isPublic ? (
        <RotaPrivada>
          <Component {...pageProps} />
        </RotaPrivada>
      ) : (
        <Component {...pageProps} />
      )}
      <ToastContainer position="top-right" autoClose={5000} />
    </SocketContext.Provider>
  );
}

export default MyApp;
