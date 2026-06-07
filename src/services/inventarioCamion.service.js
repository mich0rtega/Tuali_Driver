const { InventarioCamion } = require('../models');
const { Op }               = require('sequelize');
 
// ─── CRUD ─────────────────────────────────────────────────────────────────────
 
const listar = () =>
  InventarioCamion.findAll({ order: [['id', 'ASC']] });
 
const obtener = async (id) => {
  const item = await InventarioCamion.findByPk(id);
  if (!item) {
    const err = new Error('Producto no encontrado en el inventario.');
    err.status = 404;
    throw err;
  }
  return item;
};
 
const crear = (data) =>
  InventarioCamion.create(data);
 
const actualizar = async (id, data) => {
  const item = await obtener(id);
  return item.update(data);
};
 
const eliminar = async (id) => {
  const item = await obtener(id);
  await item.destroy();
};
 
// ─── Movimientos ──────────────────────────────────────────────────────────────
 
const entrada = async (id, cantidad) => {
  const item = await obtener(id);
  return item.update({ cantidad_actual: item.cantidad_actual + cantidad });
};
 
const salida = async (id, cantidad) => {
  const item = await obtener(id);
 
  if (item.cantidad_actual < cantidad) {
    const err = new Error(
      `Stock insuficiente. Disponible: ${item.cantidad_actual}, solicitado: ${cantidad}.`
    );
    err.status = 400;
    throw err;
  }
 
  return item.update({ cantidad_actual: item.cantidad_actual - cantidad });
};
 
// ─── Alertas ──────────────────────────────────────────────────────────────────
 
const stockBajo = () =>
  InventarioCamion.findAll({
    where: {
      cantidad_actual: { [Op.lte]: InventarioCamion.sequelize.col('stock_minimo') },
    },
    order: [['cantidad_actual', 'ASC']],
  });
 
module.exports = { listar, obtener, crear, actualizar, eliminar, entrada, salida, stockBajo };
 