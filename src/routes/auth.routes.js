const { Router }   = require('express');
const validate     = require('../middlewares/validate');
const { verifyToken } = require('../middlewares/auth.middleware');
const { registerSchema, loginSchema } = require('../schemas/auth.schema');
const authService  = require('../services/auth.service');
 
const router = Router();
 
// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ message: 'Usuario creado exitosamente.', ...result });
  } catch (err) {
    next(err);
  }
});
 
// POST /api/auth/login
router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.json({ message: 'Sesión iniciada.', ...result });
  } catch (err) {
    next(err);
  }
});
 
// GET /api/auth/me  (requiere token)
router.get('/me', verifyToken, async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
});
 
module.exports = router;
 