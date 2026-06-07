'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('sustituciones', 'estado', {
      type:         Sequelize.STRING(20),
      allowNull:    false,
      defaultValue: 'pendiente',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('sustituciones', 'estado');
  },
};
