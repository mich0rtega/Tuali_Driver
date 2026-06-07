const { Server } = require('socket.io');
 
let io;
 
const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin:  process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST'],
    },
  });
 
  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
 
    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
 
  return io;
};
 
const getIO = () => {
  if (!io) throw new Error('Socket.io no ha sido inicializado.');
  return io;
};
 
module.exports = { initSocket, getIO };
 