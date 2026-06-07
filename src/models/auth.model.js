const { DataTypes } = require('sequelize');
 
module.exports = (sequelize) => {
  const Auth = sequelize.define(
    'Auth',
    {
      id: {
        type:          DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:    true,
      },
      nombre: {
        type:      DataTypes.STRING(100),
        allowNull: false,
      },
      empleado_id: {
        type:      DataTypes.STRING(50),
        allowNull: true,
        unique:    true,
      },
      correo: {
        type:      DataTypes.STRING(150),
        allowNull: false,
        unique:    true,
        set(value) {
          this.setDataValue('correo', value?.toLowerCase().trim());
        },
      },
      password: {
        type:      DataTypes.STRING(255),
        allowNull: false,
      },
      rol: {
        type:      DataTypes.STRING(50),
        allowNull: false,
      },
      created_at: {
        type:         DataTypes.DATE,
        allowNull:    false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName:  'auth',
      timestamps: false,
    }
  );
 
  return Auth;
};
 