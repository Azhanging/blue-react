export function useInReactRouter(history) {
	history.$goBack = function () {
		if (history.length > 1) {
			window.history.back();
		} else {
			history.push('/');
		}
	}
}

