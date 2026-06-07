'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('auth', 'empleado_id', {
      type:      Sequelize.STRING(50),
      allowNull: true,
      unique:    true,
    });

    await queryInterface.addIndex('auth', ['empleado_id']);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('auth', 'empleado_id');
  },
};
