import '../styles/globals.css';
import { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import socket from '../context/socket';
import Navbar from '../components/Navbar';
import RotaPrivada from '../components/RotaPrivada';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

useEffect(() => {
  socket.on('stockUpdate', data => {
    if (data.isLowStock) {
      toast.error(`Estoque baixo: ${data.nome} (${data.quantidade})`);
    }
  });
}, [socket]);

return (
  <>
    <SocketContext.Provider value={socket}>
      <Component {...pageProps}/>
      <ToastContainer position="top-right" autoClose={5000}/>
    </SocketContext.Provider>
  </>
);

function MyApp({ Component, pageProps, router }) {
  const público = ['/login'].includes(router.pathname);
  const APP_NAME = process.env.APP_NAME || 'Serratec';
  return público
    ? <Component {...pageProps}/>
    : <RotaPrivada><Component {...pageProps}/></RotaPrivada>;
}

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    socket.connect();
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Navbar />
      <Component {...pageProps} />
    </SocketContext.Provider>
  );
}

export default MyApp;
