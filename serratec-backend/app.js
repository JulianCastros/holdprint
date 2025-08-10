require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const APP_NAME = process.env.APP_NAME || 'Serratec';

const app = express();

// 1. Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser:    true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro ao conectar MongoDB:', err));

// 2. Middleware global para JSON
app.use(express.json());

// 3. Lista de rotas com seus caminhos e módulos
const routeConfigs = [
  { path: '/api/auth',       modulePath: './routes/authRoutes' },
  { path: '/api/cliente',    modulePath: './routes/clienteRoutes' },
  { path: '/api/users',      modulePath: './routes/criarUsuario' },
  { path: '/api/dashboard',  modulePath: './routes/dashboardRoutes' },
  { path: '/api/estoque',    modulePath: './routes/estoqueRoutes' },
  { path: '/api/financeiro', modulePath: './routes/financeiroRoutes' },
  { path: '/api/orcamentos', modulePath: './routes/orcamentoRoutes' },
  { path: '/api/orders',     modulePath: './routes/orders' },
  { path: '/api/pedidos',    modulePath: './routes/pedidoRoutes' }
];

// 4. Importa e valida cada rota antes de montar
routeConfigs.forEach(({ path, modulePath }) => {
  const router = require(modulePath);

  if (typeof router !== 'function') {
    throw new TypeError(
      `Rota inválida em "${modulePath}". ` +
      `Esperava uma função (o Express Router), mas recebeu "${typeof router}".`
    );
  }

  app.use(path, router);
  console.log(`⚡ Rota montada: [${path}] → ${modulePath}`);
});

// 5. Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
