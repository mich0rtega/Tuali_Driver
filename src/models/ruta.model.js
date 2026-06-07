const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Ruta',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      repartidor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente',
      },
      total_pedidos: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    { tableName: 'rutas', timestamps: false }
  );