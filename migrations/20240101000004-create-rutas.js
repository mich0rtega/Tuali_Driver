'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rutas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      repartidor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'auth', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pendiente',
      },
      total_pedidos: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
    });

    await queryInterface.addIndex('rutas', ['repartidor_id']);
    await queryInterface.addIndex('rutas', ['fecha']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('rutas');
  },
};