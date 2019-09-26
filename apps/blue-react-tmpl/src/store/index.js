import { createStore, combineReducers } from 'redux';
import * as reducer from './reducers';

const store = createStore(combineReducers({...reducer}));

export default store;