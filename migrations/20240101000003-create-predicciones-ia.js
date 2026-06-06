'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('predicciones_ia', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_pedido: {
        type: Sequelize.STRING,
        allowNull: false,
        references: { model: 'ordenes', key: 'id_pedido' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      probabilidad_sustitucion: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      producto_recomendado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      probabilidad_aceptacion: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      motivo: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('predicciones_ia', ['id_pedido']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('predicciones_ia');
  },
};
