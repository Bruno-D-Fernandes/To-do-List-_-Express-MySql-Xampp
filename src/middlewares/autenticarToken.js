const jwt = require('jsonwebtoken');
require('dotenv').config();

function autenticarToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer tokenAqui"

  if (!token) return res.status(401).json({ erro: 'Token não encontrado' });

  jwt.verify(token, process.env.SECRET_KEY, (err, usuario) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou expirado' });

    req.usuario = usuario;
    next();
  });
  } catch (e) {
    console.log(e, 'AUTHENTICAR TOKEN');
  }

}

module.exports = autenticarToken;
