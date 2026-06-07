const dashboardRepo = require('../repositories/dashboard.repository');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class DashboardService {
  async getResumenRepartidor(repartidor_id) {
    // Primero obtenemos la ruta del día
    const rutas = await dashboardRepo.getResumenRuta(repartidor_id);

    if (!rutas.length) {
      return {
        mensaje: 'No hay ruta asignada para hoy',
        ruta: null,
        ordenes: [],
        stock_bajo: [],
        sustituciones: { total_sustituciones: 0, aceptadas: 0 },
      };
    }

    const ruta = rutas[0];

    // Con la ruta obtenemos el resto
    const [ordenes, stock_bajo, sustituciones] = await Promise.all([
      dashboardRepo.getEstadoOrdenes(ruta.id),
      dashboardRepo.getStockBajo(ruta.id),
      dashboardRepo.getSustituciones(ruta.id),
    ]);

    return {
      ruta,
      ordenes,
      stock_bajo,
      sustituciones: sustituciones[0] || { total_sustituciones: 0, aceptadas: 0 },
    };
  }
}

module.exports = new DashboardService();