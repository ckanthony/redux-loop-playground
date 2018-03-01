import { loop, Cmd } from 'redux-loop';

function initAction(){
  return {
    type: 'INIT'
  };
}

async function fetchUser(userId){
  const res = await fetch(`https://reqres.in/api/users/${userId}`);
  const result = await res.json();
  return result.data
}

function userFetchSuccessfulAction(user){
  return {
    type: 'USER_FETCH_SUCCESSFUL',
    user
  };
}

function userFetchFailedAction(err){
  return {
    type: 'USER_FETCH_ERROR',
    err
  };
}

export const initialState = {
  initStarted: false,
  user: {},
  error: null
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INIT':
      return loop(
        {...state, initStarted: true},
        Cmd.run(fetchUser, {
          successActionCreator: userFetchSuccessfulAction,
          failActionCreator: userFetchFailedAction,
          args: ['1']
        })
      );

    case 'USER_FETCH_SUCCESSFUL':
      return {...state, user: action.user};

    case 'USER_FETCH_FAILED':
      return {...state, error: action.error};

    default:
      return state;
  }
}
