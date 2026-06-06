const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Orden',
    {
      id_pedido: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
    },
    { tableName: 'ordenes', timestamps: false }
  );
