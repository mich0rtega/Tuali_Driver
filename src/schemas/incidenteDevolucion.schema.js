const { z } = require('zod');
 
const crearIncidenteSchema = z.object({
  id_pedido: z
    .number({ invalid_type_error: 'id_pedido debe ser un número.' })
    .int()
    .positive()
    .optional()
    .nullable(),
  ruta_id: z
    .number({ invalid_type_error: 'ruta_id debe ser un número.' })
    .int()
    .positive()
    .optional()
    .nullable(),
  tipo: z
    .string({ required_error: 'El tipo es requerido.' })
    .min(1, 'El tipo no puede estar vacío.')
    .max(100)
    .trim(),
  descripcion: z
    .string({ required_error: 'La descripción es requerida.' })
    .min(1, 'La descripción no puede estar vacía.')
    .trim(),
  evidencia: z
    .string()
    .trim()
    .optional()
    .nullable(),
});
 
const ESTADOS_INCIDENTE = ['Pendiente', 'En Proceso', 'Resuelto'];

const actualizarIncidenteSchema = crearIncidenteSchema.partial().extend({
  estado: z.enum(ESTADOS_INCIDENTE, {
    errorMap: () => ({ message: `El estado debe ser uno de: ${ESTADOS_INCIDENTE.join(', ')}.` }),
  }).optional(),
});

module.exports = { crearIncidenteSchema, actualizarIncidenteSchema };
 