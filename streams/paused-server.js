const net = require('net');

setInterval(() => console.log(process.memoryUsage().rss / 1024 / 1024), 1000);

function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

let processed = 0;
let server = new net.Server(socket => {
  // listen for new data in paused mode
  socket.on('readable', async () => {
    try {
      // read 100 bytes of data at a time
      // stop reading when we have nothing left!
      let data;
      while ((data = socket.read(100))) {
        // do something with data...
        // or just pause for 1ms to keep things slow
        await wait(1);

        // periodically write how much data we've processed
        processed += 100;
        if (processed % 100000 === 0) console.log(processed / 1000 + 'kB'); // log every 100kB
      }
    } catch (ex) {
      console.error(ex);
    }
  });
});
server.listen(9000);
