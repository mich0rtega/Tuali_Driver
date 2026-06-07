const { InventarioCamion } = require('../models');
const { Op }               = require('sequelize');
const notify               = require('../notifications');
const { EVENTS }           = require('../notifications');
 
// Solo registros no eliminados
const _activos = { deleted_at: null };
 
// ─── CRUD ─────────────────────────────────────────────────────────────────────
 
const listar = () =>
  InventarioCamion.findAll({
    where: _activos,
    order: [['id', 'ASC']],
  });
 
const obtener = async (id) => {
  const item = await InventarioCamion.findOne({
    where: { id, ..._activos },
  });
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
 
// Soft delete — marca deleted_at, no borra el registro
const eliminar = async (id) => {
  const item = await obtener(id);
  return item.update({ deleted_at: new Date() });
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
 
  const actualizado = await item.update({
    cantidad_actual: item.cantidad_actual - cantidad,
  });
 
  // Emitir notificación si quedó en stock bajo
  if (actualizado.cantidad_actual <= actualizado.stock_minimo) {
    notify(EVENTS.STOCK_BAJO, {
      id:              actualizado.id,
      sku:             actualizado.sku,
      nombre_producto: actualizado.nombre_producto,
      cantidad_actual: actualizado.cantidad_actual,
      stock_minimo:    actualizado.stock_minimo,
    });
  }
 
  return actualizado;
};
 
// ─── Alertas ──────────────────────────────────────────────────────────────────
 
const stockBajo = () =>
  InventarioCamion.findAll({
    where: {
      deleted_at: null,
      cantidad_actual: { [Op.lte]: InventarioCamion.sequelize.col('stock_minimo') },
    },
    order: [['cantidad_actual', 'ASC']],
  });
 
module.exports = { listar, obtener, crear, actualizar, eliminar, entrada, salida, stockBajo };
 