import types from '@store/types';
import store from '@store';

//dispatch修改view状态
export function CHANGE_VIEW(payload) {
	store.dispatch({
		type: types.CHANGE_VIEW,
		payload
	});
}
