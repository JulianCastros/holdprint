import RotaPrivada from '../../../components/RotaPrivada';
import { useRouter } from 'next/router';

function EditarCliente() {
  const { query } = useRouter();
  return <h1>Editando Cliente {query.id}</h1>;
}

export default function Page() {
  return (
    <RotaPrivada>
      <EditarCliente />
    </RotaPrivada>
  );
}
