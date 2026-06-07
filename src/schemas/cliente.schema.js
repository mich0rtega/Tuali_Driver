const { z } = require('zod');

const crearClienteSchema = z.object({
  customer_id: z
    .string({ required_error: 'El customer_id es requerido.' })
    .min(1, 'El customer_id no puede estar vacío.')
    .trim(),
  nombre_negocio: z
    .string({ required_error: 'El nombre del negocio es requerido.' })
    .min(1, 'El nombre del negocio no puede estar vacío.')
    .trim(),
  direccion: z.string().trim().optional().nullable(),
  telefono: z.string().trim().optional().nullable(),
  tipo_negocio: z.string().trim().optional().nullable(),
});

const actualizarClienteSchema = crearClienteSchema.partial();

module.exports = { crearClienteSchema, actualizarClienteSchema };
