const sequelize = require('../config/database');
const OrdenModel = require('./orden.model');
const SustitucionModel = require('./sustitucion.model');
const PrediccionIAModel = require('./prediccionIA.model');
const AuthModel = require('./auth.model');
const InventarioCamionModel = require('./inventarioCamion.model');

const Orden = OrdenModel(sequelize);
const Sustitucion = SustitucionModel(sequelize);
const PrediccionIA = PrediccionIAModel(sequelize);
const Auth = AuthModel(sequelize); 
const InventarioCamion = InventarioCamionModel(sequelize);

// Relaciones
Orden.hasMany(Sustitucion, { foreignKey: 'id_pedido', as: 'sustituciones' });
Sustitucion.belongsTo(Orden, { foreignKey: 'id_pedido', as: 'orden' });

Orden.hasMany(PrediccionIA, { foreignKey: 'id_pedido', as: 'predicciones' });
PrediccionIA.belongsTo(Orden, { foreignKey: 'id_pedido', as: 'orden' });

module.exports = { sequelize, Orden, Sustitucion, PrediccionIA, Auth, InventarioCamion };
