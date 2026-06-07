const { Auth } = require('../models');
 
const findByCorreo = (correo) =>
  Auth.findOne({ where: { correo } });
 
const findById = (id) =>
  Auth.findByPk(id, {
    attributes: ['id', 'nombre', 'correo', 'rol', 'created_at'],
  });
 
const create = ({ nombre, correo, password, rol }) =>
  Auth.create({ nombre, correo, password, rol });
 
module.exports = { findByCorreo, findById, create };
 