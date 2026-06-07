const { z } = require('zod');

const OrdenCreateSchema = z.object({
  customer_id: z.string().min(1),
  ruta_id: z.number().int().positive().optional(),
  cedis: z.string().optional(),
  fecha_pedido: z.string().datetime().optional(),
  fecha_entrega: z.string().datetime().optional(),
  status_final: z
    .enum(['pendiente', 'entregada', 'sustituida', 'cancelada'])
    .default('pendiente'),
  valor_pedido: z.number().optional(),
  subtotal: z.number().optional(),
  total: z.number().optional(),
});

module.exports = { OrdenCreateSchema };