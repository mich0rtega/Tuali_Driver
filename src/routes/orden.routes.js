const { Router } = require('express');
const ordenService = require('../services/orden.service');
const { OrdenCreateSchema } = require('../schemas/orden.schema');
const validate = require('../middlewares/validate');

const router = Router();

// POST /api/ordenes
router.post('/', validate(OrdenCreateSchema), async (req, res, next) => {
  try {
    const orden = await ordenService.create(req.body);
    res.status(201).json(orden);
  } catch (err) {
    next(err);
  }
});

// GET /api/ordenes
router.get('/', async (req, res, next) => {
  try {
    const offset = Math.max(0, parseInt(req.query.skip) || 0);
    const limit = Math.min(500, Math.max(1, parseInt(req.query.limit) || 100));
    const ordenes = await ordenService.getAll({ offset, limit });
    res.json(ordenes);
  } catch (err) {
    next(err);
  }
});

// GET /api/ordenes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const orden = await ordenService.getById(parseInt(req.params.id, 10));
    res.json(orden);
  } catch (err) {
    next(err);
  }
});

// GET /api/ordenes/ruta/:ruta_id
router.get('/ruta/:ruta_id', async (req, res, next) => {
  try {
    const ordenes = await ordenService.getByRuta(
      parseInt(req.params.ruta_id, 10)
    );
    res.json(ordenes);
  } catch (err) {
    next(err);
  }
});

// GET /api/ordenes/cliente/:customer_id
router.get('/cliente/:customer_id', async (req, res, next) => {
  try {
    const ordenes = await ordenService.getByCliente(req.params.customer_id);
    res.json(ordenes);
  } catch (err) {
    next(err);
  }
});

// PUT /api/ordenes/:id/status
router.put('/:id/status', async (req, res, next) => {
  try {
    const { status_final } = req.body;
    const orden = await ordenService.updateStatus(
      parseInt(req.params.id, 10),
      status_final
    );
    res.json(orden);
  } catch (err) {
    next(err);
  }
});

module.exports = router;