import types from '@store/types';
import utils from 'blue-utils';
import _state from '@store/state';

export function weChat(state = _state.weChat, action) {
	const {type, payload} = action;
	switch (type) {
		case types.SET_WE_CHAT:
			return utils.extend(state, payload);
		default:
			return state;
	}
}
