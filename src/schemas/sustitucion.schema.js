const { z } = require('zod');

const SustitucionCreateSchema = z.object({
  id_pedido: z.string().min(1),
  sku_original: z.string().min(1),
  producto_original: z.string().min(1),
  sku_sustituto: z.string().min(1),
  producto_sustituto: z.string().min(1),
  aceptado: z.boolean().default(false),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD'),
});

module.exports = { SustitucionCreateSchema };
