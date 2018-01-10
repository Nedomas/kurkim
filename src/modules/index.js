import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entries from './entries';
import profile from './profile';
import profileMainPhoto from './profileMainPhoto';

export default combineReducers({
  routing: routerReducer,
  entries,
  profile,
  profileMainPhoto,
});
