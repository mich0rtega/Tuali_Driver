const { Ruta } = require('../models');

class RutaRepository {
  async create(data) {
    return Ruta.create(data);
  }

  async findAll({ offset = 0, limit = 100 } = {}) {
    return Ruta.findAll({ offset, limit });
  }

  async findById(id) {
    return Ruta.findByPk(id);
  }

  async findByRepartidor(repartidor_id) {
    return Ruta.findAll({ where: { repartidor_id } });
  }

  async updateEstado(id, estado) {
    const ruta = await Ruta.findByPk(id);
    if (!ruta) return null;
    ruta.estado = estado;
    return ruta.save();
  }
}

module.exports = new RutaRepository();