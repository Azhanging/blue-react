import types from '@store/types';
import store from '@store';

//dispatch修改微信状态
export function WECHAT ( payload: any ) {
	store.dispatch({
		type: types.WECHAT,
		payload
	});
}
