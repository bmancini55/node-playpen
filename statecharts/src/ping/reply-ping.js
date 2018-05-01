const { Machine } = require('xstate');

class ReplyPing {
  constructor() {
    this.stateMachine = Machine({
      initial: 'idle',
      states: {
        // idle state
        idle: {
          on: {
            pingReceived: 'sendingPong',
          },
        },

        // sending pong state
        sendingPong: {
          onEntry: '_sendPing',
          on: {
            pongSent: 'idle',
            pingFlooding: 'disconnect',
          },
        },
      },
    });
    this.state = this.stateMachine.initialState;
  }

  event(e) {
    let nextState = this.stateMachine.transition(this.state, e);
    if (!nextState) {
      console.warn('   -> no state', e);
      return;
    }
    this.state = nextState;
    for (let action of nextState.actions) {
      this[action]();
    }
  }

  receivePing() {
    console.log('received ping');
    this.event('pingReceived');
  }

  _sendPing() {
    console.log('sending pong');
    this.event('pongSent');
  }
}

module.exports = ReplyPing;
