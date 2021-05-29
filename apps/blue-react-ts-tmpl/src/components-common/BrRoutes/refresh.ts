import utils from 'blue-utils';
import {THistoryRoute} from "./types";

//路由的刷新状态,这里涉及到beforeRouteUpdate的情况下需要使用
//避免keep-alive的缓存机制
function matchParamsRefresh ( {route}: { route: THistoryRoute } ): boolean {

	const {params, query} = route;
	const {params: metaParams, query: metaQuery} = route.meta;

	//检查params一致性
	if (metaParams) {
		let key;
		for (key in params) {
			if (!params.hasOwnProperty(key)) continue;
			if (metaParams[ key ] !== params[ key ]) {
				return true;
			}
		}
	}

	//检查query一致性
	if (metaQuery) {
		let key;
		for (key in query) {
			if (!query.hasOwnProperty(key)) continue;
			if (metaQuery[ key ] !== query[ key ]) {
				return true;
			}
		}
	}

	return false;
}

//匹配强制刷新的列表
export function matchUnforcedListRefresh ( {fromRoute, toRoute}: { fromRoute: THistoryRoute, toRoute: THistoryRoute } ): boolean {
	const {refresh} = fromRoute.meta;
	const {unforcedList} = refresh;
	const {fullPath: toRoutePath}: { fullPath: string } = toRoute;
	for (let i = 0; i < unforcedList.length; i++) {
		const path = unforcedList[ i ];
		//如果匹配的是字符串，那需要全等匹配
		if (utils.isStr(path) && (path === toRoutePath)) {
			return false;
		} else if ((path instanceof RegExp) && (path.test(toRoutePath))) {
			return false;
		}
	}
	return true;
}

//设置刷新状态
export function setRefresh ( route: THistoryRoute ) {
	const meta = route.meta;
	const refresh = meta.refresh;

	//检查参数
	if (refresh.status !== true) {
		refresh.status = matchParamsRefresh({
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