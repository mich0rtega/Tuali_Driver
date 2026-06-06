const { Router } = require('express');
const router = Router();

// Importar rutas de cada módulo aquí
// router.use('/usuarios', require('./usuarios.routes'));
// router.use('/viajes', require('./viajes.routes'));

router.get('/', (req, res) => {
  res.json({ message: 'Tuali Driver API v1.0' });
});

module.exports = router;
