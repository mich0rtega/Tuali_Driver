'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ordenes', {
      id_pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ruta_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'rutas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      cedis: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_pedido: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fecha_entrega: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status_final: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'pendiente',
      },
      valor_pedido: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      subtotal: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      total: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('ordenes', ['ruta_id']);
    await queryInterface.addIndex('ordenes', ['customer_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('ordenes');
  },
};