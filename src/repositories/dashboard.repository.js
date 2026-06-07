const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class DashboardRepository {
  async getResumenRuta(repartidor_id) {
    return sequelize.query(
      `SELECT estado, total_pedidos, fecha
       FROM rutas
       WHERE repartidor_id = :repartidor_id
       AND fecha = CURRENT_DATE`,
      { replacements: { repartidor_id }, type: QueryTypes.SELECT }
    );
  }

  async getEstadoOrdenes(ruta_id) {
    return sequelize.query(
      `SELECT status_final, COUNT(*) as total
       FROM ordenes
       WHERE ruta_id = :ruta_id
       GROUP BY status_final`,
      { replacements: { ruta_id }, type: QueryTypes.SELECT }
    );
  }

  async getStockBajo(ruta_id) {
    return sequelize.query(
      `SELECT nombre_producto, cantidad_actual, stock_minimo
       FROM inventario_camion
       WHERE ruta_id = :ruta_id
       AND cantidad_actual <= stock_minimo`,
      { replacements: { ruta_id }, type: QueryTypes.SELECT }
    );
  }

  async getSustituciones(ruta_id) {
    return sequelize.query(
      `SELECT 
         COUNT(*) as total_sustituciones,
         SUM(CASE WHEN s.aceptado = true THEN 1 ELSE 0 END) as aceptadas
       FROM sustituciones s
       JOIN ordenes o ON s.id_pedido = o.id_pedido
       WHERE o.ruta_id = :ruta_id`,
      { replacements: { ruta_id }, type: QueryTypes.SELECT }
    );
  }
}

module.exports = new DashboardRepository();