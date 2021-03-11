import types from '@store/types';
import store from '@store';

//dispatch修改view状态
export function VIEWS ( payload: any ) {
	return store.dispatch({
		type: types.VIEWS,
		payload
	});
}
