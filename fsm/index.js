class App {
  constructor() {
    this.state = 'pending';

    this.stateChart = {
      pending: {
        on: {
          INITIATE: 'initiatorStart',
        },
      },
      initiatorStart: {
        onEnter: ['_initialize', '_initiatorAct1'],
        on: {
          RECEIVE_HANDSHAKE_REPLY: 'initiatorConfirm',
        },
      },
      initiatorConfirm: {
        onEnter: ['_initiatorAct2', '_initiatorAct3'],
        on: {
          ACTIVE: 'active',
        },
      },
      active: {
        onEnter: ['_active'],
      },
    };
  }

  initiate() {
    this._dispatch({ type: 'INITIATE' });
  }

  _dispatch(event) {
    this.state;
    let newState = this.stateChart[this.state].on[event.type];
    let actions = this.stateChart[newState].onEnter || [];

    console.log('old:', this.state, 'new:', newState, 'actions:', actions);

    this.state = newState;
    for (let action of actions) {
      this[action](event);
    }
  }

  _initialize() {
    console.log('initializing');
  }

  _initiatorAct1() {
    console.log('initiate act1');
    console.log('sending act1');
    setTimeout(() => this._dispatch({ type: 'RECEIVE_HANDSHAKE_REPLY' }), 1000);
  }

  _initiatorAct2() {
    console.log('initiator act2');
  }

  _initiatorAct3() {
    console.log('initiator act3');
    console.log('sending act3');
    this._dispatch({ type: 'ACTIVE' });
  }

  _active() {
    console.log('i am now active');
  }
}

let app = new App();
app.initiate();
