const { Cliente } = require('../models');

const listar = () =>
  Cliente.findAll({ order: [['nombre_negocio', 'ASC']] });

const obtener = async (id) => {
  const cliente = await Cliente.findByPk(id);
  if (!cliente) {
    const err = new Error('Cliente no encontrado.');
    err.status = 404;
    throw err;
  }
  return cliente;
};

const obtenerPorCustomerId = async (customer_id) => {
  const cliente = await Cliente.findOne({ where: { customer_id } });
  if (!cliente) {
    const err = new Error('Cliente no encontrado.');
    err.status = 404;
    throw err;
  }
  return cliente;
};

const _verificarCustomerIdDisponible = async (customer_id, excluirId = null) => {
  const existente = await Cliente.findOne({ where: { customer_id } });
  if (existente && existente.id !== excluirId) {
    const err = new Error('Ya existe un cliente con ese customer_id.');
    err.status = 409;
    throw err;
  }
};

const crear = async (data) => {
  await _verificarCustomerIdDisponible(data.customer_id);
  return Cliente.create(data);
};

const actualizar = async (id, data) => {
  const cliente = await obtener(id);
  if (data.customer_id) {
    await _verificarCustomerIdDisponible(data.customer_id, id);
  }
  return cliente.update(data);
};

const eliminar = async (id) => {
  const cliente = await obtener(id);
  await cliente.destroy();
};

module.exports = { listar, obtener, obtenerPorCustomerId, crear, actualizar, eliminar };
