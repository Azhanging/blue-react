import * as Toast from './toast';

export function useAntdInReact(React) {
	React.$antd = React.Component.prototype.$antd = {
		//toast相关
		...Toast,
	};
}