import RotaPrivada from '../components/RotaPrivada';

function Dashboard() {
  return <h1>Bem-vindo ao Dashboard</h1>;
}

export default function Page() {
  return (
    <RotaPrivada>
      <Dashboard />
    </RotaPrivada>
  );
}
