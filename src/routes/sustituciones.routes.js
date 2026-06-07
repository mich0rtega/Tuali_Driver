const { Router } = require('express');
const sustitucionService = require('../services/sustitucion.service');
const { SustitucionCreateSchema, SustitucionUpdateSchema } = require('../schemas/sustitucion.schema');
const validate = require('../middlewares/validate');

const router = Router();

/**
 * POST /api/sustituciones
 * Registra una nueva sustitución de producto.
 */
router.post('/', validate(SustitucionCreateSchema), async (req, res, next) => {
  try {
    const sustitucion = await sustitucionService.create(req.body);
    res.status(201).json(sustitucion);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/sustituciones?skip=0&limit=100
 * Lista sustituciones con paginación.
 */
router.get('/', async (req, res, next) => {
  try {
    const offset = Math.max(0, parseInt(req.query.skip) || 0);
    const limit = Math.min(500, Math.max(1, parseInt(req.query.limit) || 100));
    const sustituciones = await sustitucionService.getAll({ offset, limit });
    res.json(sustituciones);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/sustituciones/:id
 * Obtiene una sustitución por su ID.
 */
router.get('/:id', async (req, res, next) => {
  try {
    const sustitucion = await sustitucionService.getById(parseInt(req.params.id, 10));
    res.json(sustitucion);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /api/sustituciones/:id
 * Actualiza el estado de una sustitución (notificar al cliente, aplicar, rechazar).
 */
router.put('/:id', validate(SustitucionUpdateSchema), async (req, res, next) => {
  try {
    const sustitucion = await sustitucionService.update(parseInt(req.params.id, 10), req.body);
    res.json(sustitucion);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
