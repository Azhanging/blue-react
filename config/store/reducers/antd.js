import utils from 'blue-utils';
import types from '../types';

//activity indicator状态
export function initActivityIndicatorState(){
	return {
		toast: true,
		text: ``,
		animating: false
	};
}

//antd的状态存储
function initAntdState() {
	return {
		//弹窗状态
		activityIndicator: initActivityIndicatorState()
	};
}

export function antd(state = initAntdState(), action) {
	const {type, payload} = action;
	switch (type) {
		//修改activity indicator
		case types.TOGGLE_ACTIVITY_INDICATOR:
			return utils.extend(state, {
				activityIndicator: payload
			});
		default:
			return state;
	}
}