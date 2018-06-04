const zmq = require('zeromq');
const sock = zmq.socket('sub');

sock.connect('tcp://127.0.0.1:3000');
sock.subscribe('tickers');

sock.on('message', (topic, message) => {
  console.log(topic.toString(), message.toString());
});
