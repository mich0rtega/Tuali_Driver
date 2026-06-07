'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('incidentes_devoluciones', 'estado', {
      type:         Sequelize.STRING(20),
      allowNull:    false,
      defaultValue: 'Pendiente',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('incidentes_devoluciones', 'estado');
  },
};
