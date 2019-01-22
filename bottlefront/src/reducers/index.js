import { combineReducers } from 'redux';

import user from './user_reducer';
import msg from './msg_reducer';

export default combineReducers({
  user,
  msg
});
