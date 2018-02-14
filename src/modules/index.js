import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import entries from './entries';
import profile from './profile';
import profileMainPhoto from './profileMainPhoto';
import applyPerson from './applyPerson';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  entries,
  profile,
  profileMainPhoto,
  applyPerson,
});
