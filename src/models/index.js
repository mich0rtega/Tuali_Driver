const sequelize                = require('../config/database');
const OrdenModel               = require('./orden.model');
const SustitucionModel         = require('./sustitucion.model');
const PrediccionIAModel        = require('./prediccionIA.model');
const AuthModel                = require('./auth.model');
const InventarioCamionModel    = require('./inventarioCamion.model');
const RutaModel                = require('./ruta.model');
const IncidenteDevolucionModel = require('./incidenteDevolucion.model');

const Orden               = OrdenModel(sequelize);
const Sustitucion         = SustitucionModel(sequelize);
const PrediccionIA        = PrediccionIAModel(sequelize);
const Auth                = AuthModel(sequelize);
const InventarioCamion    = InventarioCamionModel(sequelize);
const Ruta                = RutaModel(sequelize);
const IncidenteDevolucion = IncidenteDevolucionModel(sequelize);

// Relaciones
Orden.hasMany(Sustitucion,   { foreignKey: 'id_pedido', as: 'sustituciones' });
Sustitucion.belongsTo(Orden, { foreignKey: 'id_pedido', as: 'orden' });

Orden.hasMany(PrediccionIA,   { foreignKey: 'id_pedido', as: 'predicciones' });
PrediccionIA.belongsTo(Orden, { foreignKey: 'id_pedido', as: 'orden' });

Ruta.hasMany(Orden,       { foreignKey: 'ruta_id', as: 'ordenes' });
Orden.belongsTo(Ruta,     { foreignKey: 'ruta_id', as: 'ruta' });

module.exports = {
  sequelize,
  Orden,
  Sustitucion,
  PrediccionIA,
  Auth,
  InventarioCamion,
  Ruta,
  IncidenteDevolucion,
};