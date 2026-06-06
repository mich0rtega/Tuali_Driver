const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'PrediccionIA',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_pedido: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      probabilidad_sustitucion: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      producto_recomendado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      probabilidad_aceptacion: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      motivo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { tableName: 'predicciones_ia', timestamps: false }
  );
