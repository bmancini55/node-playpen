const zmq = require('zeromq');
const sock = zmq.socket('pub');

sock.bindSync('tcp://127.0.0.1:3000');
console.log('listening on 3000');

setInterval(() => {
  sock.send(['tickers', 'data']);
}, 1000);
