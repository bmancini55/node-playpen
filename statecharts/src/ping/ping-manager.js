const { Machine } = require('xstate');

class PingPongState {
  constructor() {
    this.stateMachine = Machine({
      initial: 'idle',
      states: {
        // idle state
        idle: {
          onEntry: '_enqueuePing',
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
            pingFlood: 'disconnect',
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
    this._enqueuePing();
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

  pingReceived() {
    console.log('<-- ping');
    this.event('pingReceived');
  }

  pongReceived() {
    console.log('<-- pong');
    this.event('pongReceived');
  }

  _sendPing() {
    console.log('ping -->');
    this.event('pingSent');
    this._constructPingTimeout();
    setTimeout(() => this.pongReceived(), 1000);
  }

  _sendPong() {
    clearTimeout(this.pongTimeout);
    console.log('pong -->');
    this.event('pongSent');
  }

  _enqueuePing() {
    clearTimeout(this.nextPing);
    this.nextPing = setTimeout(() => this.event('pingReady'), 5000);
  }

  _constructPingTimeout() {
    this.pongTimeout = setTimeout(() => this.event('pongTimedOut'), 2000);
  }
}

module.exports = PingPongState;
