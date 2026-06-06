const { Router } = require('express');
const predictionService = require('../services/prediction.service');

const router = Router();

/**
 * GET /api/ai/recommendations/:sku
 * Retorna las mejores alternativas de sustitución para un SKU,
 * ordenadas por score descendente (motor de frecuencia histórica).
 *
 * Ejemplo de respuesta:
 * [
 *   { "producto": "Fanta", "score": 62.5 },
 *   { "producto": "Sprite", "score": 37.5 }
 * ]
 */
router.get('/recommendations/:sku', async (req, res, next) => {
  try {
    const recomendaciones = await predictionService.getBestAlternatives(
      req.params.sku
    );
    res.json(recomendaciones);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/ai/predict/:id_pedido
 * Genera y persiste predicciones de sustitución para un pedido completo.
 */
router.get('/predict/:id_pedido', async (req, res, next) => {
  try {
    const resultado = await predictionService.predictSubstitution(
      req.params.id_pedido
    );
    res.json(resultado);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
