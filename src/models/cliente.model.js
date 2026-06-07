const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'Cliente',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nombre_negocio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tipo_negocio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { tableName: 'clientes', timestamps: false }
  );
