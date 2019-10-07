import { createStore, combineReducers } from 'redux';
//公共reducers
import * as reducers from './reducers';

//redux工具
const REDUX_DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__;

//项目store
const store = createStore(combineReducers({
  ...reducers,
}), REDUX_DEVTOOLS && REDUX_DEVTOOLS());

export default store;