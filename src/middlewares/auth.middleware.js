const jwt    = require('jsonwebtoken');
const config = require('../config');
 
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
 
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado.' });
  }
 
  const token = authHeader.split(' ')[1];
 
  try {
    req.user = jwt.verify(token, config.jwt.secret); // { id, correo, rol, iat, exp }
    next();
  } catch (err) {
    const msg = err.name === 'TokenExpiredError'
      ? 'El token ha expirado.'
      : 'Token inválido.';
    return res.status(401).json({ error: msg });
  }
};
 
// Uso: authorizeRoles('admin', 'supervisor')
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.rol)) {
    return res.status(403).json({
      error: `Acceso denegado. Roles permitidos: ${roles.join(', ')}.`,
    });
  }
  next();
};
 
module.exports = { verifyToken, authorizeRoles };
 