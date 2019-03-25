const net = require('net');

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function run() {
  let socket = net.connect({ host: 'localhost', port: 9000 });
  let run = true;
  while (run) {
    socket.write('hello');
    await wait(5000);
  }
}

run().catch(console.error);
