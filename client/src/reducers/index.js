import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import settings from './settings';
import { itemsHasErrored, itemsIsLoading, items } from '../routes/login/reducers';

const reducers = {
  routing: routerReducer,
  settings,
  itemsHasErrored,
  itemsIsLoading,
  items
};

module.exports = combineReducers(reducers);
