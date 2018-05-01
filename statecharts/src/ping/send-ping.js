const { Machine } = require('xstate');

class SendPing {
  constructor() {
    this.stateMachine = Machine({
      initial: 'idle',
      states: {
        // idle state
        idle: {
          onEntry: '_resetTimeout',
          on: {
            message: 'idle',
            messageTimeout: 'sendingPing',
          },
        },

        // sending ping state
        sendingPing: {
          onEntry: '_sendPing',
          on: {
            pingSent: 'awaitingPong',
          },
        },

        // sending awaiting pong
        awaitingPong: {
          on: {
            pongReceived: 'processingPong',
            pongTimedOut: 'disconnect',
          },
        },

        // processing ping
        processingPong: {
          onEntry: '_processPong',
          on: {
            pongValidated: 'idle',
            pongInvalidated: 'disconnect',
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
    if (!newState) console.log(' ---> WARNING', e);
    if (newState) {
      this.state = newState;
      for (let action of newState.actions) {
        this[action]();
      }
    }
  }

  receiveMessage() {
    this.event('message');
  }

  pongReceived() {
    console.log('pong received');
    this.event('pongReceived');
  }

  _sendPing() {
    console.log('sending ping');
    this.event('pingSent');
    this._constructPingTimeout();
  }

  _processPong() {
    console.log('processing pong');
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

module.exports = SendPing;
