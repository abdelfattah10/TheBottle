import { FETCH_USER } from '../actions';

let INITIAL = {
  userData: {
    name:'A',
    email: 'e-mail',
    points: 0
  }
}

export default (state = INITIAL, action) => {
    console.log('reducer', action);
  switch(action.type){
     case FETCH_USER: return {...state, userData: action.payload}
    default: return state;
  }
}
