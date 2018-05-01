const fetch = require('node-fetch');
const { Machine } = require('xstate');

const starWarsMachine = Machine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        REQUEST: {
          pending: {
            actions: ['alertStartingFirstRequest'],
          },
        },
      },
      onExit: 'alertMayTheForceBeWithYou',
    },
    pending: {
      on: {
        SUCCESS: 'fulfilled',
        FAILURE: 'rejected',
      },
      onEntry: 'fetchPerson',
      onExit: 'alertRequestFinished',
    },
    fulfilled: {
      on: {
        REQUEST: 'pending',
      },
    },
    rejected: {
      on: {
        REQUEST: 'pending',
      },
    },
  },
});

const actionMap = {
  alertStartingFirstRequest: () => console.log('Starting first request'),
  alertMayTheForceBeWithYou: () => console.log('May the force be with you!'),
  fetchPerson: ({ id }, dispatch) =>
    fetch(`https://swapi.co/api/people/${id}`)
      .then(res => res.json())
      .then(res =>
        dispatch({
          type: 'SUCCESS',
          payload: res,
        })
      )
      .catch(err =>
        dispatch({
          type: 'FAILURE',
          error: err,
        })
      ),
  alertRequestFinished: () => console.log('Request has finished'),
};

// atomic state - there are many different ways to update this
let currentState = starWarsMachine.initialState; // 'idle'

function dispatch(event) {
  const nextState = starWarsMachine.transition(currentState, event);
  console.log(nextState);
  nextState.actions.forEach(actionKey => {
    const action = actionMap[actionKey];
    if (action) {
      action(event, dispatch);
    }
  });

  currentState = nextState.value;
}

const requestEvent = {
  type: 'REQUEST',
  id: 3,
};

dispatch(requestEvent);
