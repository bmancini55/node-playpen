class PingManager {
  constructor() {
    this.pongTimeout = null;
    this.nextPing = null;
    this._queuePing();
  }

  receivePing() {
    console.log('<-- ping');
    this._sendPong();
    this._reset();
  }

  receivePong() {
    console.log('<-- pong');
    this._reset();
  }

  disconnect() {
    console.log('DISCONNECTED');
  }

  _sendPong() {
    console.log('pong -->');
  }

  _sendPing() {
    console.log('ping -->');
    this.pongTimeout = setTimeout(() => this.disconnect(), 2000);
    setTimeout(() => this.receivePong(), 1000); // simulate a pong reply
  }

  _reset() {
    this._clearPongTimeout();
    this._queuePing();
  }

  _clearPongTimeout() {
    clearTimeout(this.pongTimeout);
  }

  _queuePing() {
    clearTimeout(this.nextPing);
    this.nextPing = setTimeout(() => this._sendPing(), 5000);
  }
}

module.exports = PingManager;
