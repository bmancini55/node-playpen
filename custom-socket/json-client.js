const JsonSocket = require('./json-socket');

async function run() {
  let socket = new JsonSocket();
  socket.connect({ host: 'localhost', port: 9000 });

  let interval = setInterval(() => {
    console.log('sending', socket.write({ hello: 'world' }));
  }, 1000);

  socket.on('close', () => clearInterval(interval));
  socket.on('error', console.error);
  socket.on('data', d => console.log(d));

  // socket.cork();
  // setTimeout(() => socket.uncork(), 10000);
}

run().catch(console.error);
