const { Auth } = require('../models');
 
const findByCorreo = (correo) =>
  Auth.findOne({ where: { correo } });

const findByEmpleadoId = (empleado_id) =>
  Auth.findOne({ where: { empleado_id } });

const findById = (id) =>
  Auth.findByPk(id, {
    attributes: ['id', 'nombre', 'empleado_id', 'correo', 'rol', 'created_at'],
  });

const create = ({ nombre, empleado_id, correo, password, rol }) =>
  Auth.create({ nombre, empleado_id, correo, password, rol });

module.exports = { findByCorreo, findByEmpleadoId, findById, create };
 