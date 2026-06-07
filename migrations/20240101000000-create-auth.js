'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('auth', {
      id: {
        type:          Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
        allowNull:     false,
      },
      nombre: {
        type:      Sequelize.STRING(100),
        allowNull: false,
      },
      correo: {
        type:      Sequelize.STRING(150),
        allowNull: false,
        unique:    true,
      },
      password: {
        type:      Sequelize.STRING(255),
        allowNull: false,
      },
      rol: {
        type:      Sequelize.STRING(50),
        allowNull: false,
      },
      created_at: {
        type:         Sequelize.DATE,
        allowNull:    false,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('auth');
  },
};