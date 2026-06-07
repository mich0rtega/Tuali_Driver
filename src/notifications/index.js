const { getIO }  = require('../config/socket');
const EVENTS     = require('./events');

const notify = (event, payload) => {
  try {
    getIO().emit(event, payload);
  } catch (err) {
    console.error('No se pudo emitir notificación:', err.message);
  }
};

notify.EVENTS = EVENTS;

module.exports = notify;
