const { Router } = require('express');
const router = Router();

router.use('/sustituciones', require('./sustituciones.routes'));
router.use('/ai',            require('./ai.routes'));
router.use('/auth',          require('./auth.routes'));

router.get('/', (req, res) => {
  res.json({ message: 'Tuali Driver API v1.0' });
});

module.exports = router;