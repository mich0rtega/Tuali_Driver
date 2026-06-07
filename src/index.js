require('dotenv').config();
const http             = require('http');
const https            = require('https');
const fs               = require('fs');
const path             = require('path');
const app              = require('./app');
const { initSocket }   = require('./config/socket');

const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

// Crear servidor HTTP para que Socket.io pueda usarlo
const server = http.createServer(app);

// Inicializar Socket.io
initSocket(server);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// Servidor HTTPS con certificado autofirmado: necesario para que apps en
// dispositivos físicos (iOS bloquea HTTP plano por App Transport Security)
// puedan conectarse al backend durante pruebas en red local.
const certPath = path.join(__dirname, '..', 'certs', 'cert.pem');
const keyPath  = path.join(__dirname, '..', 'certs', 'key.pem');
if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
  https
    .createServer({ cert: fs.readFileSync(certPath), key: fs.readFileSync(keyPath) }, app)
    .listen(HTTPS_PORT, () => {
      console.log(`Servidor HTTPS (cert. autofirmado) en https://localhost:${HTTPS_PORT}`);
    });
}
 