const { Router } = require('express');
const dashboardService = require('../services/dashboard.service');

const router = Router();

// GET /api/dashboard/:repartidor_id
router.get('/:repartidor_id', async (req, res, next) => {
  try {
    const resumen = await dashboardService.getResumenRepartidor(
      parseInt(req.params.repartidor_id, 10)
    );
    res.json(resumen);
  } catch (err) {
    next(err);
  }
});

module.exports = router;