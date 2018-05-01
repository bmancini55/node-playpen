const PingManager = require('./ping-manager');
const state = new PingManager();

setTimeout(() => state.pingReceived(), 12000);
