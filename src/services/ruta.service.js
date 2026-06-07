const rutaRepo = require('../repositories/ruta.repository');

class RutaService {
  async create(data) {
    return rutaRepo.create(data);
  }

  async getAll({ offset = 0, limit = 100 } = {}) {
    return rutaRepo.findAll({ offset, limit });
  }

  async getById(id) {
    const ruta = await rutaRepo.findById(id);
    if (!ruta) {
      const err = new Error(`Ruta con id=${id} no encontrada`);
      err.status = 404;
      throw err;
    }
    return ruta;
  }

  async getByRepartidor(repartidor_id) {
    return rutaRepo.findByRepartidor(repartidor_id);
  }

  async iniciar(id) {
    const ruta = await rutaRepo.updateEstado(id, 'en_curso');
    if (!ruta) {
      const err = new Error(`Ruta con id=${id} no encontrada`);
      err.status = 404;
      throw err;
    }
    return ruta;
  }

  async completar(id) {
    const ruta = await rutaRepo.updateEstado(id, 'completada');
    if (!ruta) {
      const err = new Error(`Ruta con id=${id} no encontrada`);
      err.status = 404;
      throw err;
    }
    return ruta;
  }
}

module.exports = new RutaService();