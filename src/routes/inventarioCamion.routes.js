const { Router }  = require('express');
const validate    = require('../middlewares/validate');
const { verifyToken } = require('../middlewares/auth.middleware');
const {
  crearInventarioSchema,
  actualizarInventarioSchema,
  movimientoSchema,
} = require('../schemas/inventarioCamion.schema');
const svc = require('../services/inventarioCamion.service');

const router = Router();

// Todas las rutas requieren token
router.use(verifyToken);

// GET /api/inventario/stock-bajo
router.get('/stock-bajo', async (req, res, next) => {
  try {
    const items = await svc.stockBajo();
    res.json({ data: items, total: items.length });
  } catch (err) {
    next(err);
  }
});

// GET /api/inventario
router.get('/', async (req, res, next) => {
  try {
    const items = await svc.listar();
    res.json({ data: items, total: items.length });
  } catch (err) {
    next(err);
  }
});

// GET /api/inventario/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await svc.obtener(Number(req.params.id));
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
});

// POST /api/inventario
router.post('/', validate(crearInventarioSchema), async (req, res, next) => {
  try {
    const item = await svc.crear(req.body);
    res.status(201).json({ message: 'Producto agregado al inventario.', data: item });
  } catch (err) {
    next(err);
  }
});

// PUT /api/inventario/:id
router.put('/:id', validate(actualizarInventarioSchema), async (req, res, next) => {
  try {
    const item = await svc.actualizar(Number(req.params.id), req.body);
    res.json({ message: 'Inventario actualizado.', data: item });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/inventario/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await svc.eliminar(Number(req.params.id));
    res.json({ message: 'Producto eliminado del inventario.' });
  } catch (err) {
    next(err);
  }
});

// POST /api/inventario/:id/entrada
router.post('/:id/entrada', validate(movimientoSchema), async (req, res, next) => {
  try {
    const item = await svc.entrada(Number(req.params.id), req.body.cantidad);
    res.json({ message: `Entrada registrada. Nueva cantidad: ${item.cantidad_actual}.`, data: item });
  } catch (err) {
    next(err);
  }
});

// POST /api/inventario/:id/salida
router.post('/:id/salida', validate(movimientoSchema), async (req, res, next) => {
  try {
    const item = await svc.salida(Number(req.params.id), req.body.cantidad);
    const alerta = item.cantidad_actual <= item.stock_minimo;
    res.json({
      message: `Salida registrada. Nueva cantidad: ${item.cantidad_actual}.`,
      data:    item,
      ...(alerta && { alerta: `⚠️ Stock bajo. Quedan ${item.cantidad_actual} unidades (mínimo: ${item.stock_minimo}).` }),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;