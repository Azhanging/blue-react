import { useState, useEffect } from 'react';
import utils from 'blue-utils'
import BlueQueuePipe from 'blue-queue-pipe';

//历史队列
export const historyQueue = new BlueQueuePipe({
	methods: {
		shift() {
			return this.queue.shift();
		}
	}
});

//缓存
const cache = {
	//获取缓存
	getState(opts = {}) {
		const {routeKey, stateKey, initValue} = opts;
		const state = cache.state[routeKey] || {};
		if (stateKey) {
			return state[stateKey] || initValue;
		}
		return state;
	},
	//设置key对于的缓存信息
	setState(opts = {}) {
		const {routeKey, state} = opts;
		const cacheState = cache.state;
		cacheState[routeKey] = state;
	},
	//删除状态
	removeState(history) {
		const {meta} = history.route;
		const {refresh} = meta;
		const {to, from} = history.navigator;

		if (!historyQueue.isEmpty()) {
			//如果是back
			refresh.status = true;
			//回到初始化的query和params
			meta.query = null;
			meta.params = null;
			historyQueue.useMethod('shift');
		}

		//强制刷新的列表
		if (refresh.status !== true && refresh.unforcedList.length > 0) {
			refresh.status = matchUnforcedListRedirect({
				fromRoute: from,
				toRoute: to
			});
		}
	},
	//状态存储
	state: {}
};

//路由的刷新状态,这里涉及到beforeRouteUpdate的情况下需要使用
//避免keep-alive的缓存机制
function matchParamsRedirect({route}) {

	const {params, query} = route;
	const {params: metaParams, query: metaQuery} = route.meta;

	//检查params一致性
	if (metaParams !== null) {
		let key;
		for (key in params) {
			if (!params.hasOwnProperty(key)) continue;
			if (metaParams[key] !== params[key]) {
				return true;
			}
		}
	}

	//检查query一致性
	if (metaQuery !== null) {
		let key;
		for (key in query) {
			if (!query.hasOwnProperty(key)) continue;
			if (metaQuery[key] !== query[key]) {
				return true;
			}
		}
	}

	return false;
}

//匹配强制刷新的列表
function matchUnforcedListRedirect({fromRoute, toRoute}) {
	const {refresh} = fromRoute.meta;
	const {unforcedList} = refresh;
	const {fullPath: toRouteFullPath} = toRoute;
	for (let i = 0; i < unforcedList.length; i++) {
		const path = unforcedList[i];
		//如果匹配的是字符串，那需要全等匹配
		if (utils.isStr(path) && (path === toRouteFullPath)) {
			return false;
		} else if ((path instanceof RegExp) && (path.test(toRouteFullPath))) {
			return false;
		}
	}
	return true;
}

//设置刷新状态
function setRefresh(route) {
	const meta = route.meta;
	const refresh = meta.refresh;

	//检查参数
	if (refresh.status !== true) {
		refresh.status = matchParamsRedirect({
			route
		});
	}

	meta.query = route.query;
	meta.params = route.params;

	setTimeout(() => {
		// 在为refresh === true的情况，在执行下一event loop就要恢复回到的false
		// 循环跳到一个view层的话，会出现back后会刷新，因为存在回环，这是正常的现象
		if (refresh.status === true) {
			refresh.status = false;
		}
	}, 10);

}

//cache hook
export function useCache(opts = {}) {
	const {history} = opts;
	const {route} = history;
	const routeKey = useState(route.key);
	//设置刷新状态
	useEffect(() => {
		setRefresh(route);
	}, []);
	return {
		getState(stateKey, initValue) {
			return cache.getState({
				routeKey,
				stateKey,
				initValue
			})
		},
		setState(state) {
			return cache.setState({
				routeKey,
				state
			});
		},
		removeState() {
			return cache.removeState(history);
		}
	};
}