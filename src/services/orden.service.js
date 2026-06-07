const ordenRepo = require('../repositories/orden.repository');

class OrdenService {
  async create(data) {
    return ordenRepo.create(data);
  }

  async getAll({ offset = 0, limit = 100 } = {}) {
    return ordenRepo.findAll({ offset, limit });
  }

  async getById(id) {
    const orden = await ordenRepo.findById(id);
    if (!orden) {
      const err = new Error(`Orden con id=${id} no encontrada`);
      err.status = 404;
      throw err;
    }
    return orden;
  }

  async getByRuta(ruta_id) {
    return ordenRepo.findByRuta(ruta_id);
  }

  async getByCliente(customer_id) {
    return ordenRepo.findByCliente(customer_id);
  }

  async updateStatus(id, status_final) {
    const orden = await ordenRepo.updateStatus(id, status_final);
    if (!orden) {
      const err = new Error(`Orden con id=${id} no encontrada`);
      err.status = 404;
      throw err;
    }
    return orden;
  }
}

module.exports = new OrdenService();