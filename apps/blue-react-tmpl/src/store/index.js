import { createStore, combineReducers } from 'redux';
//公共reducers
import * as reducers from './reducers';

//项目store
const store = createStore(combineReducers({
	...reducers
}));

export default store;