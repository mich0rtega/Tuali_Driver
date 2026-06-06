const sustitucionRepo = require('../repositories/sustitucion.repository');
const prediccionRepo = require('../repositories/prediccionIA.repository');

class PredictionService {
  /**
   * Motor de recomendación basado en frecuencia histórica.
   *
   * Calcula un score proporcional por sustituto:
   *   score = (frecuencia_sustituto / total_sustituciones) * 100
   *
   * Ejemplo:
   *   Coca -> Fanta: 500 veces → score 62.5
   *   Coca -> Sprite: 300 veces → score 37.5
   *
   * @param {string} sku - SKU del producto original
   * @returns {Promise<Array<{ producto: string, score: number }>>}
   */
  async getBestAlternatives(sku) {
    const rows = await sustitucionRepo.getFrequencyBySku(sku);
    if (!rows.length) return [];

    const total = rows.reduce((sum, r) => sum + parseInt(r.frecuencia, 10), 0);

    return rows.map(({ producto_sustituto, frecuencia }) => ({
      producto: producto_sustituto,
      score: parseFloat(((parseInt(frecuencia, 10) / total) * 100).toFixed(2)),
    }));
  }

  /**
   * Calcula la tasa de aceptación histórica de sustituciones para un SKU.
   * @param {string} sku
   * @returns {Promise<number>} Porcentaje de 0 a 100
   */
  async calculateAcceptanceRate(sku) {
    const { aceptadas, total } = await sustitucionRepo.getAcceptanceStats(sku);
    if (total === 0) return 0;
    return parseFloat(((aceptadas / total) * 100).toFixed(2));
  }

  /**
   * Genera y persiste predicciones para todos los SKUs únicos de un pedido.
   *
   * Estrategia:
   * 1. Obtiene las sustituciones históricas del pedido.
   * 2. Para cada SKU único, calcula mejores alternativas y tasa de aceptación.
   * 3. Persiste una predicción por cada alternativa y retorna el resultado.
   *
   * @param {string} id_pedido
   * @returns {Promise<{ id_pedido: string, predicciones: object[], recomendaciones: object[] }>}
   */
  async predictSubstitution(id_pedido) {
    const sustituciones = await sustitucionRepo.findByPedido(id_pedido);

    if (!sustituciones.length) {
      const err = new Error(
        `No se encontraron sustituciones para el pedido ${id_pedido}`
      );
      err.status = 404;
      throw err;
    }

    const skusUnicos = [...new Set(sustituciones.map((s) => s.sku_original))];
    const prediccionesGuardadas = [];
    const todasRecomendaciones = [];

    for (const sku of skusUnicos) {
      const [alternativas, tasa] = await Promise.all([
        this.getBestAlternatives(sku),
        this.calculateAcceptanceRate(sku),
      ]);

      todasRecomendaciones.push(...alternativas);

      for (const alt of alternativas) {
        const pred = await prediccionRepo.create({
          id_pedido,
          probabilidad_sustitucion: parseFloat((alt.score / 100).toFixed(4)),
          producto_recomendado: alt.producto,
          probabilidad_aceptacion: parseFloat((tasa / 100).toFixed(4)),
          motivo: `Frecuencia histórica: ${alt.score}% de sustituciones de ${sku} fueron a ${alt.producto}. Tasa de aceptación: ${tasa}%`,
          fecha: new Date().toISOString().split('T')[0],
        });
        prediccionesGuardadas.push(pred);
      }
    }

    return {
      id_pedido,
      predicciones: prediccionesGuardadas,
      recomendaciones: todasRecomendaciones,
    };
  }
}

module.exports = new PredictionService();
