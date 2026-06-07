const { Orden } = require('../models');

class OrdenRepository {
  async create(data) {
    return Orden.create(data);
  }

  async findAll({ offset = 0, limit = 100 } = {}) {
    return Orden.findAll({ offset, limit });
  }

  async findById(id) {
    return Orden.findByPk(id);
  }

  async findByRuta(ruta_id) {
    return Orden.findAll({ where: { ruta_id } });
  }

  async findByCliente(customer_id) {
    return Orden.findAll({ where: { customer_id } });
  }

  async updateStatus(id, status_final) {
    const orden = await Orden.findByPk(id);
    if (!orden) return null;
    orden.status_final = status_final;
    return orden.save();
  }
}

module.exports = new OrdenRepository();