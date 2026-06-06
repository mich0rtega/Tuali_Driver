const { PrediccionIA } = require('../models');

class PrediccionIARepository {
  /**
   * Persiste una nueva predicción.
   * @param {object} data
   * @returns {Promise<PrediccionIA>}
   */
  async create(data) {
    return PrediccionIA.create(data);
  }

  /**
   * Retorna todas las predicciones de un pedido.
   * @param {string} id_pedido
   * @returns {Promise<PrediccionIA[]>}
   */
  async findByPedido(id_pedido) {
    return PrediccionIA.findAll({ where: { id_pedido } });
  }

  /**
   * Busca una predicción por PK.
   * @param {number} id
   * @returns {Promise<PrediccionIA|null>}
   */
  async findById(id) {
    return PrediccionIA.findByPk(id);
  }
}

module.exports = new PrediccionIARepository();
