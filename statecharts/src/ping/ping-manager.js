const { Machine } = require('xstate');

class PingPongState {
  constructor() {
    this.stateMachine = Machine({
      initial: 'idle',
      states: {
        // idle state
        idle: {
          onEntry: '_resetTimeout',
          on: {
            messageTimeout: 'sendingPing',
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
            pongReceived: 'processingPong',
            pongTimedOut: 'disconnect',
            pingReceived: 'sendingPong',
          },
        },

        // processing ping
        processingPong: {
          onEntry: '_processPong',
          on: {
            pongValidated: 'idle',
            pongInvalidated: 'disconnect',
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
    this._resetTimeout();
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
    clearTimeout(this.pingTimeout);
    console.log('pong -->');
    this.event('pongSent');
  }

  _processPong() {
    clearTimeout(this.pingTimeout);
    this.event('pongValidated');
  }

  _resetTimeout() {
    clearTimeout(this.messageTimeout);
    this.messageTimeout = setTimeout(() => this.event('messageTimeout'), 5000);
  }

  _constructPingTimeout() {
    this.pingTimeout = setTimeout(() => this.event('pongTimedOut'), 2000);
  }
}

module.exports = PingPongState;
