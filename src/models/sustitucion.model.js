const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Sustitucion',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_pedido: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sku_original: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      producto_original: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sku_sustituto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      producto_sustituto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      aceptado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      estado: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'pendiente',
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { tableName: 'sustituciones', timestamps: false }
  );
