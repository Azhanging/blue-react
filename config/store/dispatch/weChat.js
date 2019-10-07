import types from '@store/types';
import store from '@store';

//dispatch修改微信状态
export function SET_WE_CHAT(payload) {
	store.dispatch({
		type: types.SET_WE_CHAT,
		payload
	});
}
