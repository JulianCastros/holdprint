import RotaPrivada from '../../components/RotaPrivada';

function NovoCliente() {
  return <h1>Novo Cliente</h1>;
}

export default function Page() {
  return (
    <RotaPrivada>
      <NovoCliente />
    </RotaPrivada>
  );
}
