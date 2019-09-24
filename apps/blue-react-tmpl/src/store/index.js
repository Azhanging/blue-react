import { createStore, combineReducers } from 'redux';
import reducer from './reducers/index';

const store = createStore(combineReducers({...reducer}));

export default store;