const { DataTypes } = require('sequelize');
 
module.exports = (sequelize) => {
  const InventarioCamion = sequelize.define(
    'InventarioCamion',
    {
      id: {
        type:          DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
      },
      ruta_id: {
        type:      DataTypes.INTEGER,
        allowNull: true,
      },
      sku: {
        type:      DataTypes.STRING(100),
        allowNull: false,
      },
      nombre_producto: {
        type:      DataTypes.STRING(150),
        allowNull: false,
      },
      cantidad_actual: {
        type:         DataTypes.INTEGER,
        allowNull:    false,
        defaultValue: 0,
      },
      stock_minimo: {
        type:         DataTypes.INTEGER,
        allowNull:    false,
        defaultValue: 0,
      },
    },
    {
      tableName:  'inventario_camion',
      timestamps: false,
    }
  );
 
  return InventarioCamion;
};
 