const { z } = require('zod');
 
const ROLES_VALIDOS = ['admin', 'repartidor', 'supervisor', 'almacen'];
 
const registerSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre es requerido.' })
    .min(2, 'El nombre debe tener al menos 2 caracteres.')
    .max(100, 'El nombre no puede superar 100 caracteres.')
    .trim(),
  correo: z
    .string({ required_error: 'El correo es requerido.' })
    .email('Debe ser un correo válido.')
    .toLowerCase(),
  password: z
    .string({ required_error: 'La contraseña es requerida.' })
    .min(6, 'La contraseña debe tener al menos 6 caracteres.'),
  rol: z.enum(ROLES_VALIDOS, {
    errorMap: () => ({ message: `El rol debe ser uno de: ${ROLES_VALIDOS.join(', ')}.` }),
  }),
});
 
const loginSchema = z.object({
  correo: z
    .string({ required_error: 'El correo es requerido.' })
    .email('Debe ser un correo válido.')
    .toLowerCase(),
  password: z
    .string({ required_error: 'La contraseña es requerida.' })
    .min(1, 'La contraseña es requerida.'),
});
 
module.exports = { registerSchema, loginSchema };
 