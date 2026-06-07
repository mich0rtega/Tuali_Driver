const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const config  = require('../config');
const authRepo = require('../repositories/auth.repository');
 
const register = async ({ nombre, correo, password, rol }) => {
  const existe = await authRepo.findByCorreo(correo);
  if (existe) {
    const err = new Error('Ya existe una cuenta con ese correo.');
    err.status = 409;
    throw err;
  }
 
  const hash = await bcrypt.hash(password, 10);
  const user = await authRepo.create({ nombre, correo, password: hash, rol });
 
  const token = _generarToken(user);
  return { token, user: _publicUser(user) };
};
 
const login = async ({ correo, password }) => {
  const user = await authRepo.findByCorreo(correo);
 
  // Mismo mensaje para usuario no encontrado y contraseña incorrecta
  // (evita enumerar correos registrados)
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const err = new Error('Credenciales incorrectas.');
    err.status = 401;
    throw err;
  }
 
  const token = _generarToken(user);
  return { token, user: _publicUser(user) };
};
 
const getMe = async (id) => {
  const user = await authRepo.findById(id);
  if (!user) {
    const err = new Error('Usuario no encontrado.');
    err.status = 404;
    throw err;
  }
  return user;
};
 
// ─── Helpers privados ─────────────────────────────────────────────────────────
function _generarToken(user) {
  return jwt.sign(
    { id: user.id, correo: user.correo, rol: user.rol },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
}
 
function _publicUser(user) {
  return {
    id:         user.id,
    nombre:     user.nombre,
    correo:     user.correo,
    rol:        user.rol,
    created_at: user.created_at,
  };
}
 
module.exports = { register, login, getMe };
 