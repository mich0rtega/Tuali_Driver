require('dotenv').config();
const bcrypt = require('bcryptjs');
const {
  sequelize,
  Auth,
  Cliente,
  Ruta,
  Orden,
  InventarioCamion,
  Sustitucion,
  IncidenteDevolucion,
} = require('./models');

// Datos representativos extraídos de las muestras reales en /home/michelle/Documentos/DATOS
// (Orders.csv, OrderDetails.csv, Resultados.csv) — nombres de productos y pares de
// sustitución reales del catálogo Arca Continental.

const HOY = new Date().toISOString().split('T')[0];

const CLIENTES = [
  { customer_id: 'CUST-1001', nombre_negocio: 'Oxxo Constitución', direccion: 'Av. Constitución #120, Centro', telefono: '8112345601', tipo_negocio: 'Tienda de conveniencia' },
  { customer_id: 'CUST-1002', nombre_negocio: 'Miscelánea La Esperanza', direccion: 'Calle Juárez #45, Obispado', telefono: '8112345602', tipo_negocio: 'Misceláneas' },
  { customer_id: 'CUST-1003', nombre_negocio: 'Tienda Don Roberto', direccion: 'Av. Morones Prieto #890', telefono: '8112345603', tipo_negocio: 'Misceláneas' },
  { customer_id: 'CUST-1004', nombre_negocio: 'Farmacia del Ahorro #7', direccion: 'Blvd. Manuel Gómez #230', telefono: '8112345604', tipo_negocio: 'Farmacia' },
  { customer_id: 'CUST-1005', nombre_negocio: 'FEMSA Sucursal Centro', direccion: 'Calle Hidalgo #890', telefono: '8112345605', tipo_negocio: 'Distribuidora' },
];

// sku, nombre_producto, cantidad_actual, stock_minimo
const PRODUCTOS = [
  { sku: '1469', nombre_producto: 'Ciel Agua Purificada', cantidad_actual: 120, stock_minimo: 80 },
  { sku: '2577', nombre_producto: 'Coca - Cola Zero', cantidad_actual: 45, stock_minimo: 40 },
  { sku: '959', nombre_producto: 'Familia Coca - Cola', cantidad_actual: 15, stock_minimo: 25 },
  { sku: '38', nombre_producto: 'Coca - Cola', cantidad_actual: 90, stock_minimo: 50 },
  { sku: '1152', nombre_producto: 'Topo Chico Agua Mineral', cantidad_actual: 75, stock_minimo: 60 },
  { sku: '463', nombre_producto: 'Powerade Frutas Rojas', cantidad_actual: 10, stock_minimo: 20 },
  { sku: '375', nombre_producto: 'Del Valle Mango', cantidad_actual: 70, stock_minimo: 30 },
  { sku: '411', nombre_producto: 'Del Valle Guayaba', cantidad_actual: 20, stock_minimo: 25 },
];

// sku/producto original -> sku/producto sustituto, basado en pares reales de Resultados.csv
const SUSTITUCIONES_DATA = [
  { sku_original: '2577', producto_original: 'Coca - Cola Zero', sku_sustituto: '1405', producto_sustituto: 'Coca - Cola, Botella Pet 400 ml, 12 Piezas', aceptado: false, estado: 'pendiente' },
  { sku_original: '959', producto_original: 'Familia Coca - Cola', sku_sustituto: '1605', producto_sustituto: 'Familia Coca - Cola, Paquete Surtido Botella Pet 2.50 L Retornable, 8 Piezas', aceptado: false, estado: 'notificada' },
  { sku_original: '463', producto_original: 'Powerade Frutas Rojas', sku_sustituto: '2908', producto_sustituto: 'Powerade Coco, Botella Pet 600 ml, 6 Piezas', aceptado: true, estado: 'aplicada' },
  { sku_original: '1469', producto_original: 'Ciel Agua Purificada', sku_sustituto: '3637', producto_sustituto: 'Ciel Exprim Gasificada Maracuya, Botella Pet 600 ml, 6 Piezas', aceptado: false, estado: 'pendiente' },
  { sku_original: '411', producto_original: 'Del Valle Guayaba', sku_sustituto: '2862', producto_sustituto: 'Del Valle y Nada Coco, Botella Pet 600 ml, 6 Piezas', aceptado: false, estado: 'pendiente' },
];

const TIPOS_INCIDENTE = ['Cliente Cerrado', 'Producto Dañado', 'Pedido Incompleto'];

async function seed() {
  await sequelize.authenticate();
  console.log('Conectado a la base de datos. Sembrando datos...');

  // ─── Usuario repartidor ───────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('tuali123', 10);
  const [repartidor] = await Auth.findOrCreate({
    where: { empleado_id: 'ARC-12345' },
    defaults: {
      nombre: 'Carlos Mendoza',
      empleado_id: 'ARC-12345',
      correo: 'carlos.mendoza@tuali.mx',
      password: passwordHash,
      rol: 'repartidor',
    },
  });
  console.log(`✓ Usuario repartidor: ${repartidor.empleado_id} (password: tuali123)`);

  // ─── Clientes ─────────────────────────────────────────────────────────────
  const clientes = [];
  for (const data of CLIENTES) {
    const [cliente] = await Cliente.findOrCreate({ where: { customer_id: data.customer_id }, defaults: data });
    clientes.push(cliente);
  }
  console.log(`✓ Clientes: ${clientes.length}`);

  // ─── Ruta del día para el repartidor ──────────────────────────────────────
  let ruta = await Ruta.findOne({ where: { repartidor_id: repartidor.id, fecha: HOY } });
  if (!ruta) {
    ruta = await Ruta.create({
      repartidor_id: repartidor.id,
      fecha: HOY,
      estado: 'en_curso',
      total_pedidos: clientes.length,
    });
  }
  console.log(`✓ Ruta del día: #${ruta.id} (${ruta.estado})`);

  // ─── Inventario del camión ────────────────────────────────────────────────
  for (const data of PRODUCTOS) {
    await InventarioCamion.findOrCreate({
      where: { ruta_id: ruta.id, sku: data.sku },
      defaults: { ...data, ruta_id: ruta.id },
    });
  }
  console.log(`✓ Inventario del camión: ${PRODUCTOS.length} productos`);

  // ─── Pedidos de la ruta ───────────────────────────────────────────────────
  const ESTADOS_ORDEN = ['Entregado', 'En camino', 'Pendiente', 'Urgente', 'Pendiente'];
  const ordenes = [];
  for (let i = 0; i < clientes.length; i++) {
    const cliente = clientes[i];
    let orden = await Orden.findOne({ where: { customer_id: cliente.customer_id, ruta_id: ruta.id } });
    if (!orden) {
      orden = await Orden.create({
        customer_id: cliente.customer_id,
        ruta_id: ruta.id,
        cedis: '3012',
        fecha_pedido: new Date(),
        fecha_entrega: null,
        status_final: ESTADOS_ORDEN[i % ESTADOS_ORDEN.length],
        valor_pedido: 7,
        subtotal: 1300 + i * 45.5,
        total: 1500 + i * 50.25,
      });
    }
    ordenes.push(orden);
  }
  console.log(`✓ Pedidos: ${ordenes.length}`);

  // ─── Sustituciones ligadas a los pedidos ──────────────────────────────────
  for (let i = 0; i < SUSTITUCIONES_DATA.length; i++) {
    const data = SUSTITUCIONES_DATA[i];
    const orden = ordenes[i % ordenes.length];
    await Sustitucion.findOrCreate({
      where: { id_pedido: orden.id_pedido, sku_original: data.sku_original },
      defaults: { ...data, id_pedido: orden.id_pedido, fecha: HOY },
    });
  }
  console.log(`✓ Sustituciones: ${SUSTITUCIONES_DATA.length}`);

  // ─── Incidentes / devoluciones ────────────────────────────────────────────
  const incidentesData = [
    { id_pedido: ordenes[3]?.id_pedido, tipo: TIPOS_INCIDENTE[0], descripcion: 'El local estaba cerrado con llave.' },
    { id_pedido: ordenes[1]?.id_pedido, tipo: TIPOS_INCIDENTE[1], descripcion: 'Botella de Coca-Cola 2L golpeada durante el transporte.' },
  ];
  for (const data of incidentesData) {
    await IncidenteDevolucion.findOrCreate({
      where: { id_pedido: data.id_pedido, tipo: data.tipo },
      defaults: { ...data, ruta_id: ruta.id, evidencia: null },
    });
  }
  console.log(`✓ Incidentes: ${incidentesData.length}`);

  console.log('\nListo. Datos de prueba sembrados correctamente.');
  console.log(`Inicia sesión con: empleado_id=ARC-12345 / password=tuali123`);
}

seed()
  .catch((err) => {
    console.error('Error al sembrar datos:', err);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
