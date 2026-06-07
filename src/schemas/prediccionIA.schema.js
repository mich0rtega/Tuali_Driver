const { z } = require('zod');

const PrediccionIACreateSchema = z.object({
  id_pedido: z.number().int().positive(),
  probabilidad_sustitucion: z.number().min(0).max(1),
  producto_recomendado: z.string().min(1),
  probabilidad_aceptacion: z.number().min(0).max(1),
  motivo: z.string().optional(),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'La fecha debe tener formato YYYY-MM-DD'),
});

module.exports = { PrediccionIACreateSchema };
