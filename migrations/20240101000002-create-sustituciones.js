'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sustituciones', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ordenes', key: 'id_pedido' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      sku_original: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      producto_original: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sku_sustituto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      producto_sustituto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      aceptado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      fecha: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });

    await queryInterface.addIndex('sustituciones', ['id_pedido']);
    await queryInterface.addIndex('sustituciones', ['sku_original']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('sustituciones');
  },
};
