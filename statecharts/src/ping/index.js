const PingPong = require('./combined');
const state = new PingPong();

setTimeout(() => state.pingReceived(), 12000);
