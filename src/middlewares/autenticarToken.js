const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer tokenAqui"

  if (!token) return res.status(401).json({ erro: 'Token não encontrado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou expirado' });

    req.usuario = usuario; // injeta os dados do token na request
    next();
  });
}

module.exports = autenticarToken;
