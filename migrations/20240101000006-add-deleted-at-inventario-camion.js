'use strict';
 
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('inventario_camion', 'deleted_at', {
      type:      Sequelize.DATE,
      allowNull: true,
    });
  },
 
  async down(queryInterface) {
    await queryInterface.removeColumn('inventario_camion', 'deleted_at');
  },
};
 