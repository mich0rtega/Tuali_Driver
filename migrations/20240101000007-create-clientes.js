'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clientes', {
      id: {
        type:          Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
        allowNull:     false,
      },
      customer_id: {
        type:      Sequelize.STRING,
        allowNull: false,
        unique:    true,
      },
      nombre_negocio: {
        type:      Sequelize.STRING,
        allowNull: false,
      },
      direccion: {
        type:      Sequelize.TEXT,
        allowNull: true,
      },
      telefono: {
        type:      Sequelize.STRING,
        allowNull: true,
      },
      tipo_negocio: {
        type:      Sequelize.STRING,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('clientes', ['customer_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('clientes');
  },
};
