import { combineReducers } from 'redux';

import account from './account';
import settings from './settings';
import marker from './marker';

const reducers = combineReducers({
  account,
  settings,
  marker
});
export default reducers;
