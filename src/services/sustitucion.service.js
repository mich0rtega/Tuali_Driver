const sustitucionRepo = require('../repositories/sustitucion.repository');

class SustitucionService {
  /**
   * Registra una nueva sustitución.
   * @param {object} data - Payload validado por SustitucionCreateSchema
   * @returns {Promise<object>}
   */
  async create(data) {
    return sustitucionRepo.create(data);
  }

  /**
   * Lista sustituciones con paginación.
   * @param {{ offset?: number, limit?: number }} options
   * @returns {Promise<object[]>}
   */
  async getAll({ offset = 0, limit = 100 } = {}) {
    return sustitucionRepo.findAll({ offset, limit });
  }

  /**
   * Retorna una sustitución por ID o lanza 404.
   * @param {number} id
   * @returns {Promise<object>}
   */
  async getById(id) {
    const sustitucion = await sustitucionRepo.findById(id);
    if (!sustitucion) {
      const err = new Error(`Sustitución con id=${id} no encontrada`);
      err.status = 404;
      throw err;
    }
    return sustitucion;
  }
}

module.exports = new SustitucionService();
