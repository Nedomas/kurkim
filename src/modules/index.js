import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entries from './entries';

export default combineReducers({
  routing: routerReducer,
  entries,
});
