const { Router } = require('express');
const rutaService = require('../services/ruta.service');
const { RutaCreateSchema } = require('../schemas/ruta.schema');
const validate = require('../middlewares/validate');

const router = Router();

// POST /api/rutas — crear ruta
router.post('/', validate(RutaCreateSchema), async (req, res, next) => {
  try {
    const ruta = await rutaService.create(req.body);
    res.status(201).json(ruta);
  } catch (err) {
    next(err);
  }
});

// GET /api/rutas — listar todas
router.get('/', async (req, res, next) => {
  try {
    const offset = Math.max(0, parseInt(req.query.skip) || 0);
    const limit = Math.min(500, Math.max(1, parseInt(req.query.limit) || 100));
    const rutas = await rutaService.getAll({ offset, limit });
    res.json(rutas);
  } catch (err) {
    next(err);
  }
});

// GET /api/rutas/:id — obtener por id
router.get('/:id', async (req, res, next) => {
  try {
    const ruta = await rutaService.getById(parseInt(req.params.id, 10));
    res.json(ruta);
  } catch (err) {
    next(err);
  }
});

// GET /api/rutas/repartidor/:repartidor_id — rutas por repartidor
router.get('/repartidor/:repartidor_id', async (req, res, next) => {
  try {
    const rutas = await rutaService.getByRepartidor(
      parseInt(req.params.repartidor_id, 10)
    );
    res.json(rutas);
  } catch (err) {
    next(err);
  }
});

// PUT /api/rutas/:id/iniciar — cambiar estado a en_curso
router.put('/:id/iniciar', async (req, res, next) => {
  try {
    const ruta = await rutaService.iniciar(parseInt(req.params.id, 10));
    res.json(ruta);
  } catch (err) {
    next(err);
  }
});

// PUT /api/rutas/:id/completar — cambiar estado a completada
router.put('/:id/completar', async (req, res, next) => {
  try {
    const ruta = await rutaService.completar(parseInt(req.params.id, 10));
    res.json(ruta);
  } catch (err) {
    next(err);
  }
});

module.exports = router;