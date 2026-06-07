const { z } = require('zod');
 
const crearInventarioSchema = z.object({
  ruta_id: z
    .number({ invalid_type_error: 'ruta_id debe ser un número.' })
    .int()
    .positive()
    .optional()
    .nullable(),
  sku: z
    .string({ required_error: 'El SKU es requerido.' })
    .min(1, 'El SKU no puede estar vacío.')
    .max(100)
    .trim(),
  nombre_producto: z
    .string({ required_error: 'El nombre del producto es requerido.' })
    .min(1, 'El nombre no puede estar vacío.')
    .max(150)
    .trim(),
  cantidad_actual: z
    .number({ required_error: 'La cantidad actual es requerida.' })
    .int('La cantidad debe ser un número entero.')
    .min(0, 'La cantidad no puede ser negativa.'),
  stock_minimo: z
    .number({ required_error: 'El stock mínimo es requerido.' })
    .int('El stock mínimo debe ser un número entero.')
    .min(0, 'El stock mínimo no puede ser negativo.'),
});
 
const actualizarInventarioSchema = crearInventarioSchema.partial();
 
const movimientoSchema = z.object({
  cantidad: z
    .number({ required_error: 'La cantidad es requerida.' })
    .int('La cantidad debe ser un número entero.')
    .positive('La cantidad debe ser mayor a 0.'),
});
 
module.exports = {
  crearInventarioSchema,
  actualizarInventarioSchema,
  movimientoSchema,
};
 