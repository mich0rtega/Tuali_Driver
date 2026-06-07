const { Router }      = require('express');
const validate        = require('../middlewares/validate');
const { verifyToken } = require('../middlewares/auth.middleware');
const {
  crearIncidenteSchema,
  actualizarIncidenteSchema,
} = require('../schemas/incidenteDevolucion.schema');
const svc = require('../services/incidenteDevolucion.service');
 
const router = Router();
 
// Todas las rutas requieren token
router.use(verifyToken);
 
// GET /api/incidentes
router.get('/', async (req, res, next) => {
  try {
    const items = await svc.listar();
    res.json({ data: items, total: items.length });
  } catch (err) {
    next(err);
  }
});
 
// GET /api/incidentes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await svc.obtener(Number(req.params.id));
    res.json({ data: item });
  } catch (err) {
    next(err);
  }
});
 
// POST /api/incidentes
router.post('/', validate(crearIncidenteSchema), async (req, res, next) => {
  try {
    const item = await svc.crear(req.body);
    res.status(201).json({ message: 'Incidente registrado.', data: item });
  } catch (err) {
    next(err);
  }
});
 
// PUT /api/incidentes/:id
router.put('/:id', validate(actualizarIncidenteSchema), async (req, res, next) => {
  try {
    const item = await svc.actualizar(Number(req.params.id), req.body);
    res.json({ message: 'Incidente actualizado.', data: item });
  } catch (err) {
    next(err);
  }
});
 
// DELETE /api/incidentes/:id  (soft delete)
router.delete('/:id', async (req, res, next) => {
  try {
    await svc.eliminar(Number(req.params.id));
    res.json({ message: 'Incidente eliminado.' });
  } catch (err) {
    next(err);
  }
});
 
module.exports = router;
 