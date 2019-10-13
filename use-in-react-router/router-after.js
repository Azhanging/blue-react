import BlueQueuePipe from 'blue-queue-pipe';
import { setTabBarName } from "$components/BrTabBar";
import { routerMeta } from '@router';
import config from '@config';
import utils from 'blue-utils';

//定制history的to和from信息
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

//设置from路由
function genRouteNavigator(history) {
	//当前queue为空是初始化状态
	if (historyQueue.isEmpty()) {
		historyQueue.useMethod('unshift', [history.route]);
		historyQueue.useMethod('unshift', [history.route]);
	} else {
		historyQueue.useMethod('pop');
		historyQueue.useMethod('unshift', [history.route]);
	}
}

//设置路由导航
function setRouteNavigator(history) {
	//设置路由to,from
	history.navigator = {
		to: historyQueue.first(),
		from: historyQueue.last()
	};
}

//路由挂载后执行（和vue项目不一致，所有的meta在Routes render中才能获取到rawRoute的信息）
function routerAfter(opts = {}) {
	const {history} = opts;
	const {meta} = history.route;
	//设置 tabBar name
	setTabBarName(meta.tabBar);
	//设置路由标识
	routerMeta.setCurrentRouteID(meta.routeID);
	//设置标题
	document.title = meta.title || config.view.title;
	//生成导航
	genRouteNavigator(history);
	//设置导航
	setRouteNavigator(history);
	//执行after hook
	afterHook(meta);
}

//after后钩子
function afterHook(meta) {
	const afterHook = meta.afterHook;
	const {unAfterHook} = config.router.hooks;
	//目标路由的hook处理
	if (afterHook) {
		utils.hook(null, afterHook);
	} else {
		utils.hook(null, unAfterHook);
	}
}

export default routerAfter;