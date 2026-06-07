const { IncidenteDevolucion } = require('../models');
const { Op }                  = require('sequelize');
 
// Solo registros no eliminados
const _activos = { deleted_at: null };
 
const listar = () =>
  IncidenteDevolucion.findAll({
    where: _activos,
    order: [['fecha', 'DESC']],
  });
 
const obtener = async (id) => {
  const item = await IncidenteDevolucion.findOne({
    where: { id, ..._activos },
  });
  if (!item) {
    const err = new Error('Incidente no encontrado.');
    err.status = 404;
    throw err;
  }
  return item;
};
 
const crear = (data) =>
  IncidenteDevolucion.create(data);
 
const actualizar = async (id, data) => {
  const item = await obtener(id);
  return item.update(data);
};
 
// Soft delete — solo marca deleted_at, no borra el registro
const eliminar = async (id) => {
  const item = await obtener(id);
  return item.update({ deleted_at: new Date() });
};
 
module.exports = { listar, obtener, crear, actualizar, eliminar };
 