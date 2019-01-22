import { SUCCESS, ERROR, CLEAR } from '../actions';

const INITIAL = {
    succ:'',
    err: ''
}

export default (state = INITIAL, action) => {
    console.log('reducer', action);
  switch(action.type){
     case SUCCESS: return {...state, succ: action.payload}
     case ERROR: return {...state, err: action.payload}
     case CLEAR: return INITIAL
    default: return state;
  }
}
