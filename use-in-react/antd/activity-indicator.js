import * as action from '@store/action';
import utils from 'blue-utils';
import store from '@store';

//显示loading
export function showLoading(opts = {}) {
	return loading(utils.extend({
		animating: true
	}, opts));
}

//关闭loading
export function closeLoading(opts = {}) {
	return loading(utils.extend({
		animating: false
	}, opts));
}

//loading控制
export function loading(opts) {
	return store.dispatch(action.TOGGLE_ACTIVITY_INDICATOR(opts));
}