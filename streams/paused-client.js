const net = require('net');
const fs = require('fs');

async function run() {
  let socket = net.connect({ host: 'localhost', port: 9000 });
  let data = fs.readFileSync('./big.json'); // 200mb json file
  socket.end(data);
}

run().catch(console.error);
