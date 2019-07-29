import { combineReducers } from 'redux';
import { router5Reducer } from 'redux-router5';
import fpl from '../domains/fpl/reducer';
import config from '../domains/config/configReducer';

const rootReducer = combineReducers({
  router: router5Reducer,
  fpl,
  config
});

export default rootReducer;
