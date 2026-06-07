const { Router } = require('express');
const router = Router();

router.use('/sustituciones', require('./sustituciones.routes'));
router.use('/ai', require('./ai.routes'));
router.use('/auth', require('./auth.routes'));
router.use('/inventario', require('./inventarioCamion.routes'));
<<<<<<< Updated upstream
router.use('/rutas',      require('./ruta.routes'));
router.use('/ordenes',    require('./orden.routes'));
router.use('/dashboard',  require('./dashboard.routes'));
=======
>>>>>>> Stashed changes
router.use('/incidentes', require('./incidenteDevolucion.routes'));

router.get('/', (req, res) => {
  res.json({ message: 'Tuali Driver API v1.0' });
});

module.exports = router;