'use strict';
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('incidentes_devoluciones', {
      id: {
        type:          Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
        allowNull:     false,
      },
      id_pedido: {
        type:      Sequelize.INTEGER,
        allowNull: true,
      },
      ruta_id: {
        type:      Sequelize.INTEGER,
        allowNull: true,
      },
      tipo: {
        type:      Sequelize.STRING(100),
        allowNull: false,
      },
      descripcion: {
        type:      Sequelize.TEXT,
        allowNull: false,
      },
      evidencia: {
        type:      Sequelize.TEXT,
        allowNull: true,
      },
      fecha: {
        type:         Sequelize.DATE,
        allowNull:    false,
        defaultValue: Sequelize.literal('NOW()'),
      },
      deleted_at: {
        type:      Sequelize.DATE,
        allowNull: true,
      },
    });
  },
 
  async down(queryInterface) {
    await queryInterface.dropTable('incidentes_devoluciones');
  },
};
 