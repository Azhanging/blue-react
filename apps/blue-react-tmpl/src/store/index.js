import { createStore, combineReducers } from 'redux';
import * as reducer from './reducers/index';

const store = createStore(combineReducers({...reducer}));

console.log(store);

export default store;