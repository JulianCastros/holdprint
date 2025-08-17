// holdprint-backend/middlewares/auth.js
const jwt = require('jsonwebtoken');

// Função middleware
function verifyJWT(req, res, next) {
  // Espera um header no formato "Bearer <token>"
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato de token inválido' });
  }

  // Verifica e decodifica o token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' });
    }

    // Anexa payload ao req e segue adiante
    req.user = { id: decoded.id, role: decoded.role };
    next();
  });
}

module.exports = verifyJWT;
