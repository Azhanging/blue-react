import types from '@store/types';
import utils from 'blue-utils';

function getInitState() {
	return {
		appId: "",
		timestamp: '',
		nonceStr: '',
		signature: ''
	};
}

export function weChat(state = getInitState(), action) {
	const {type, payload} = action;
	switch (type) {
		case types.CHANGE_WE_CHAT:
			return utils.extend(state, payload);
		default:
			return state;
	}
}
