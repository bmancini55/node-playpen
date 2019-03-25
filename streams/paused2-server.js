const net = require('net');

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
let id = 0;
let server = new net.Server(socket => {
  socket.on('readable', async () => {
    try {
      let myid = ++id;
      console.log(myid, socket.read(1).toString());
      await wait(10000);
      console.log(myid, socket.read(4).toString());
    } catch (ex) {
      console.error(ex);
    }
  });
});
server.listen(9000);
