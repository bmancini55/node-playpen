const net = require('net');
const JsonSocket = require('./json-socket');

// construct a server
let server = new net.Server(socket => {
  socket = new JsonSocket(socket);
  socket.on('error', console.error);

  // flowing via event emitter
  socket.on('data', data => {
    console.log(data);
  });

  // // flowing mode via pipe
  // socket.pipe(ws);

  // // paused mode
  // socket.on('readable', async () => {
  //   try {
  //     let data;
  //     while ((data = socket.read())) {
  //       console.log(data);
  //     }
  //   } catch (ex) {
  //     console.error(ex);
  //   }
  // });
});
server.listen(9000);
