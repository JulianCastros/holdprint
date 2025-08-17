import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RotaPrivada({ children }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setOk(true);
    }
  }, [router]);

  if (!ok) return <p>Carregando...</p>;
  return children;
}
