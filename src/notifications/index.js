require('dotenv').config();
const http             = require('http');
const app              = require('./app');
const { initSocket }   = require('./config/socket');
 
const PORT = process.env.PORT || 3000;
 
// Crear servidor HTTP para que Socket.io pueda usarlo
const server = http.createServer(app);
 
// Inicializar Socket.io
initSocket(server);
 
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
 