const PingManager = require('./ping-manager');
const state = new PingManager();

setTimeout(() => state.receivePing(), 12000);
