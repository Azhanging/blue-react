import utils from 'blue-utils';
import BlueQueuePipe from 'blue-queue-pipe';
import {setRouteNavigator} from "./navigator";
import {createBrowserHistory, createHashHistory} from 'history';
import {THistory} from './types';

//创建路由
export function createHistory ( opts: {
	mode: 'hash' | 'history';
} ): THistory {
	const {mode} = opts;
	let history: THistory;
	if (mode === 'history') {
		history = createBrowserHistory();
	} else if (mode === 'hash') {
		history = createHashHistory();
	}
	//设置路由模式
	history.mode = mode;
	//扩展history
	extendHistory(history);
	return history;
}

//历史队列
export const historyQueue = new BlueQueuePipe({
	methods: {
		shift () {
			return this.queue.shift();
		}
	}
});

//设置query
function setQuery ( location: any ) {
	//设置参数
	location.query = utils.parseParams(utils.getLinkParams(location.search));
}

//设置route参数
function setRoute ( opts: {
	history: THistory;
	location: any;
	currentRoute: any;
	match: any;
} ) {
	const {
		history,
		location,
		currentRoute,
		match
	} = opts;

	history.route = {
		key: location.key,
		...match,
		query: utils.deepCopy(location.query),
		meta: currentRoute.meta || {},
		raw: currentRoute
	};
}

//设置和扩展history
export function setHistory ( opts: {
	routeProps: any;
	currentRoute: any;
} ) {
	const {routeProps, currentRoute} = opts;
	const {history, match} = routeProps;
	const {location} = history;

	//设置query
	setQuery(location);

	//设置路由
	setRoute({
		history,
		location,
		currentRoute,
		match
	});

	//设置导航to和from
	setRouteNavigator(history);
}

//扩展history
function extendHistory ( history: THistory ) {

	//扩展history原生方法
	extendHistoryModuleMethods(history);

	//获取当前地址href，直接获取location.href会出现路由未更新前的地址（分享全路径需要使用）
	history.$getHref = function () {
		const mode = this.mode;
		const origin = window.location.origin;
		const path = this.$getModePath();
		if (mode === 'hash') {
			return `${origin}${path}`;
		} else if (mode === 'history') {
			return `${origin}${path}`;
		}
	};

	//获取完整链接
	history.$getFullPath = function () {
		const {pathname, search} = this.location;
		return `${pathname}${search}`;
	};

	//路由后退规则,如果有具体的路由，否则走根路径
	history.$goBack = function () {
		if (window.history.length > 1) {
			window.history.back();
		} else {
			history.push('/');
		}
	};

	//匹配路由的路径组，返回布尔值
	history.$matchRoutes = function ( routesRegExp: RegExp[] = [] ): boolean {
		const path = this.location.pathname;
		for (let i = 0; i < routesRegExp.length; i++) {
			const routerRegExp = routesRegExp[ i ];
			routerRegExp.lastIndex = 0;
			if (routerRegExp.test(path)) {
				return true;
			}
		}
		return false;
	};

	//获取参数
	history.$getParam = function ( key: string ): string {
		return this.route.params[ key ] || '';
	};

	//获取meta
	history.$getMeta = function (): any {
		return this.route.meta;
	};

	//获取mode相关的path
	history.$getModePath = function (): string {
		const mode = this.mode;
		const path = this.$getFullPath();
		if (mode === 'hash') {
			return `/#${path}`;
		} else if (mode === 'history') {
			return `${path}`;
		}
	};
}

//扩展history module方法
function extendHistoryModuleMethods ( history: any ) {

	const {push, replace} = history;

	const methods = [{
		name: 'push',
		method: push
	}, {
		name: 'replace',
		method: replace
	}];

	methods.forEach(( item ) => {
		const {name, method} = item;
		history[ name ] = function ( path: string, state: any, restrict: boolean = false ) {
			const currentPathname = history.location.pathname;
			if (path === currentPathname && restrict === false) {
				console.warn(`path same current path:${path}`);
				return;
			}
			method.call(this, path, state);
		};
	});
}