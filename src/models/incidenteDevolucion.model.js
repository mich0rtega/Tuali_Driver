const { DataTypes } = require('sequelize');
 
module.exports = (sequelize) => {
  const IncidenteDevolucion = sequelize.define(
    'IncidenteDevolucion',
    {
      id: {
        type:          DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
      },
      id_pedido: {
        type:      DataTypes.INTEGER,
        allowNull: true,
      },
      ruta_id: {
        type:      DataTypes.INTEGER,
        allowNull: true,
      },
      tipo: {
        type:      DataTypes.STRING(100),
        allowNull: false,
      },
      descripcion: {
        type:      DataTypes.TEXT,
        allowNull: false,
      },
      evidencia: {
        type:      DataTypes.TEXT,
        allowNull: true,
      },
      fecha: {
        type:         DataTypes.DATE,
        allowNull:    false,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type:      DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName:  'incidentes_devoluciones',
      timestamps: false,
    }
  );
 
  return IncidenteDevolucion;
};
 