const net = require('net');

setInterval(() => console.log(process.memoryUsage().rss / 1024 / 1024), 1000);

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

// construct a server
let processed = 0;
let server = new net.Server(socket => {
  socket.on('readable', async () => {
    try {
      let data;
      do {
        data = socket.read(100); // 100-bytes
        processed += 100;
        await wait(1); // keep is slow
        if (processed % 100000 === 0) console.log(processed / 1000 + 'kb'); // log every 100kb
      } while (data);
    } catch (ex) {
      console.error(ex);
    }
  });
});
server.listen(9000);
