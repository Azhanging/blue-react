import utils from 'blue-utils';
import BlueQueuePipe from 'blue-queue-pipe';
import { setTabBarSubmenuIndex } from '$components/BrTabBar';

const historyQueue = new BlueQueuePipe({
	methods: {
		pop() {
			this.queue.pop();
		},
		unshift(item) {
			this.queue.unshift(item);
		}
	}
});

//设置history
function setHistory(history) {
	const {location} = history;
	//设置参数
	location.query = utils.parseParams(utils.getLinkParams(location.search));
	//设置路由to,from
	history.navigation = {
		to: historyQueue.first(),
		from: historyQueue.last()
	};
}

//设置from路由
function setFromRoute(history) {
	//当前queue为空是初始化状态
	if (historyQueue.isEmpty()) {
		historyQueue.useMethod('unshift', [history.location]);
		historyQueue.useMethod('unshift', [history.location]);
	} else {
		historyQueue.useMethod('pop');
		historyQueue.useMethod('unshift', [history.location]);
	}
}

function dispatchPopStateEvent() {
	//初始化的时候不会走listen,手动触发popState
	const popStateEvent = new Event('popstate');
	popStateEvent.state = null;
	window.dispatchEvent(popStateEvent);
}

//使用到history
export function useInReactRouter(history) {

	//添加路由监听
	history.listen(function () {

		//隐藏子菜单
		setTabBarSubmenuIndex({
			tabBarSubmenuIndex: -1
		});

		//设置to和from
		setFromRoute(history);

		//设置history
		setHistory(history);

	});

	//手动触发事件
	dispatchPopStateEvent();

	//路由后退规则,如果有具体的路由，否则走根路径
	history.$goBack = function () {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			history.push('/');
		}
	};

	//匹配路由的路径组，返回布尔值
	history.$matchRoutes = function (routesRegExp = []) {
		const path = this.location.pathname;
		for (let i = 0; i < routesRegExp.length; i++) {
			const routerRegExp = routesRegExp[i];
			routerRegExp.lastIndex = 0;
			if (routerRegExp.test(path)) {
				return true;
			}
		}
		return false;
	};

	//获取参数
	history.$getParam = function (key) {
		return this.location.params[key] || '';
	};
}

