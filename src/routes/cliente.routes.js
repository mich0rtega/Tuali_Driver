const { Router }      = require('express');
const validate        = require('../middlewares/validate');
const { verifyToken } = require('../middlewares/auth.middleware');
const {
  crearClienteSchema,
  actualizarClienteSchema,
} = require('../schemas/cliente.schema');
const svc = require('../services/cliente.service');

const router = Router();

// Todas las rutas requieren token
router.use(verifyToken);

// GET /api/clientes
router.get('/', async (req, res, next) => {
  try {
    const items = await svc.listar();
    res.json({ data: items, total: items.length });
  } catch (err) {
    next(err);
  }
});

// GET /api/clientes/customer/:customer_id
router.get('/customer/:customer_id', async (req, res, next) => {
  try {
    const item = await svc.obtenerPorCustomerId(req.params.customer_id);
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
});

// GET /api/clientes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await svc.obtener(Number(req.params.id));
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
});

// POST /api/clientes
router.post('/', validate(crearClienteSchema), async (req, res, next) => {
  try {
    const item = await svc.crear(req.body);
    res.status(201).json({ message: 'Cliente registrado.', data: item });
  } catch (err) {
    next(err);
  }
});

// PUT /api/clientes/:id
router.put('/:id', validate(actualizarClienteSchema), async (req, res, next) => {
  try {
    const item = await svc.actualizar(Number(req.params.id), req.body);
    res.json({ message: 'Cliente actualizado.', data: item });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/clientes/:id
router.delete('/:id', async (req, res, next) => {
  try {
    await svc.eliminar(Number(req.params.id));
    res.json({ message: 'Cliente eliminado.' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
