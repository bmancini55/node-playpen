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

  _reset() {
    this._clearPongTimeout();
    this._queuePing();
  }

  _sendPong() {
    console.log('pong -->');
  }

  _sendPing() {
    console.log('ping -->');
    setTimeout(() => this.receivePong(), 1000);
    this.pongTimeout = setTimeout(() => this.disconnect(), 2000);
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
