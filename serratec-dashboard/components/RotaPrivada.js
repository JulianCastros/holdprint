
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RotaPrivada({ children }) {
  const [ok, setOk] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    } else {
      setOk(true);
    }
  }, [router]);

  if (!ok) return <p className="p-6">Carregando...</p>;
  return <>{children}</>;
}
