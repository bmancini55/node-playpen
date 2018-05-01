const { Machine } = require('xstate');

class PingPongState {
  constructor() {
    this.stateMachine = Machine({
      initial: 'idle',
      states: {
        // idle state
        idle: {
          onEntry: '_reset',
          on: {
            pingReady: 'sendingPing',
            pingReceived: 'sendingPong',
          },
        },

        // sending ping state
        sendingPing: {
          onEntry: '_sendPing',
          on: {
            pingSent: 'awaitingPong',
            pingReceived: 'sendingPong',
          },
        },

        // sendingPong state
        sendingPong: {
          onEntry: '_sendPong',
          on: {
            pongSent: 'idle',
          },
        },

        // sending awaiting pong
        awaitingPong: {
          on: {
            pongReceived: 'idle',
            pongTimedOut: 'disconnect',
            pingReceived: 'sendingPong',
          },
        },

        disconnect: {
          onEntry: () => {
            console.log('disconnect');
            process.exit();
          },
        },
      },
    });

    this.state = this.stateMachine.initialState;
    this._reset();
  }

  event(e) {
    let newState = this.stateMachine.transition(this.state, e);
    if (newState) {
      this.state = newState;
      for (let action of newState.actions) {
        this[action]();
      }
    }
  }

  receivePing() {
    console.log('<-- ping');
    this.event('pingReceived');
  }

  receivePong() {
    console.log('<-- pong');
    this.event('pongReceived');
  }

  disconnect() {
    console.log('DISCONNECTED');
  }

  _sendPing() {
    console.log('ping -->');
    this.event('pingSent');
    this.pongTimeout = setTimeout(() => this.disconnect(), 2000);
    setTimeout(() => this.receivePong(), 1000); // simulate a pong reply
  }

  _sendPong() {
    console.log('pong -->');
    this.event('pongSent');
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
    this.nextPing = setTimeout(() => this.event('pingReady'), 5000);
  }
}

module.exports = PingPongState;
