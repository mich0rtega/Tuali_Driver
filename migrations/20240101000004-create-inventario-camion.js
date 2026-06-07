'use strict';
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inventario_camion', {
      id: {
        type:          Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
        allowNull:     false,
      },
      ruta_id: {
        type:      Sequelize.INTEGER,
        allowNull: true,
      },
      sku: {
        type:      Sequelize.STRING(100),
        allowNull: false,
      },
      nombre_producto: {
        type:      Sequelize.STRING(150),
        allowNull: false,
      },
      cantidad_actual: {
        type:         Sequelize.INTEGER,
        allowNull:    false,
        defaultValue: 0,
      },
      stock_minimo: {
        type:         Sequelize.INTEGER,
        allowNull:    false,
        defaultValue: 0,
      },
    });
 
    await queryInterface.addIndex('inventario_camion', ['sku'], {
      name: 'idx_inventario_sku',
    });
 
    await queryInterface.addIndex('inventario_camion', ['ruta_id'], {
      name: 'idx_inventario_ruta_id',
    });
  },
 
  async down(queryInterface) {
    await queryInterface.dropTable('inventario_camion');
  },
};
 