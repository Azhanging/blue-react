import types from '@store/types';

function getInitState() {
	return {
		tabBar: '',          //导航   String | Boolean
		tabBarSubmenuIndex: -1,    //导航子菜单状态
		pageFixed: true      //独立页面中底部容器显示控制状态，在页面中的按钮可能因为表单的选中隐藏 Boolean
	};
}

//视图相关的state
export function view(state = getInitState(), action) {
	const {type, payload} = action;
	switch (type) {
		case types:
			return utils.extend(state, {

			});
		default:
			return state;
	}
}