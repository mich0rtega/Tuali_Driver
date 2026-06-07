const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Orden',
    {
      id_pedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ruta_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cedis: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fecha_pedido: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      fecha_entrega: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status_final: {
        type: DataTypes.STRING,
        defaultValue: 'pendiente',
      },
      valor_pedido: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
    },
    { tableName: 'ordenes', timestamps: false }
  );