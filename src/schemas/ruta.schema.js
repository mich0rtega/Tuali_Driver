const { z } = require('zod');

const RutaCreateSchema = z.object({
  repartidor_id: z.number().int().positive(),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD'),
  estado: z.enum(['pendiente', 'en_curso', 'completada']).default('pendiente'),
  total_pedidos: z.number().int().min(0).default(0),
});

module.exports = { RutaCreateSchema };