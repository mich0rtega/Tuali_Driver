const { fn, col } = require('sequelize');
const { Sustitucion } = require('../models');

class SustitucionRepository {
  /**
   * Crea una nueva sustitución.
   * @param {object} data
   * @returns {Promise<Sustitucion>}
   */
  async create(data) {
    return Sustitucion.create(data);
  }

  /**
   * Lista sustituciones con paginación.
   * @param {{ offset?: number, limit?: number }} options
   * @returns {Promise<Sustitucion[]>}
   */
  async findAll({ offset = 0, limit = 100 } = {}) {
    return Sustitucion.findAll({ offset, limit, order: [['id', 'ASC']] });
  }

  /**
   * Busca una sustitución por PK.
   * @param {number} id
   * @returns {Promise<Sustitucion|null>}
   */
  async findById(id) {
    return Sustitucion.findByPk(id);
  }

  /**
   * Retorna todas las sustituciones de un pedido.
   * @param {string} id_pedido
   * @returns {Promise<Sustitucion[]>}
   */
  async findByPedido(id_pedido) {
    return Sustitucion.findAll({ where: { id_pedido } });
  }

  /**
   * Calcula la frecuencia histórica de sustitutos para un SKU original,
   * ordenada de mayor a menor.
   * @param {string} sku_original
   * @returns {Promise<Array<{ producto_sustituto: string, frecuencia: string }>>}
   */
  async getFrequencyBySku(sku_original) {
    return Sustitucion.findAll({
      attributes: [
        'producto_sustituto',
        [fn('COUNT', col('id')), 'frecuencia'],
      ],
      where: { sku_original },
      group: ['producto_sustituto'],
      order: [[fn('COUNT', col('id')), 'DESC']],
      raw: true,
    });
  }

  /**
   * Retorna { aceptadas, total } para calcular la tasa de aceptación de un SKU.
   * @param {string} sku_original
   * @returns {Promise<{ aceptadas: number, total: number }>}
   */
  async getAcceptanceStats(sku_original) {
    const [total, aceptadas] = await Promise.all([
      Sustitucion.count({ where: { sku_original } }),
      Sustitucion.count({ where: { sku_original, aceptado: true } }),
    ]);
    return { aceptadas, total };
  }
}

module.exports = new SustitucionRepository();
