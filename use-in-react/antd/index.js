import * as activityIndicator from './activity-indicator';

export function useAntdInReact(React) {
	React.$antd = React.Component.prototype = {
		...activityIndicator,
	};
}