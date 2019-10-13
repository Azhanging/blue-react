import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import utils from 'blue-utils'
import routerAfter from '$use-in-react-router/router-after';
import { historyQueue } from './cache';

export * from './cache';

//排序路由
export function sortRoutes(routes) {
	routes.sort((currentRoute, nextRoute) => {
		const currentPath = currentRoute.path;
		const nextPath = nextRoute.path;
		//如果是index path，直接后移
		if (currentPath === '/') return 1;
		const currentRouteLevel = currentPath.split('/').length;
		const nextRouteLevel = nextPath.split('/').length;
		return nextRouteLevel - currentRouteLevel;
	});
}

//扩展原生history
function extendNativeHistory() {

	const goHistory = History.prototype.go;
	const backHistory = History.prototype.back;

	History.prototype.go = function (n) {
		if (n === -1) {
			historyQueue.enqueue('back');
		}
		goHistory.call(this, n);
	};

	History.prototype.back = function () {
		historyQueue.enqueue('back');
		backHistory.call(this);
	};

}

//生成路由
export function genRoutes(routes, path) {
	const _routes = [];
	//排序路由
	sortRoutes(routes);
	//设置路由jsx规则
	routes.forEach((currentRoute, index) => {
		let routes = [];
		const childrenRoute = currentRoute.children;
		//处理多层路由链接合并问题
		if (!/^\//.test(currentRoute.path)) {
			currentRoute.path = `${path}${/\/$/.test(path) ? '' : '/'}${currentRoute.path}`;
		}
		//存在子路由数据，递归
		if (childrenRoute && childrenRoute.length > 0) {
			routes = genRoutes(childrenRoute, currentRoute.path);
		}

		//写进集合，最后给Switch渲染
		_routes.push((
			<Route
				exact={currentRoute.exact}
				strict={currentRoute.strict}
				path={currentRoute.path}
				key={`route-key-${index}`}
				render={(routeProps) => {

					/*这里设置route的props给到Page的组件内部*/
					const {history, location} = routeProps;

					//设置路由内部route数据
					history.route = {
						key: location.key,
						...routeProps.match,
						query: utils.extend({}, location.query),
						meta: currentRoute.meta || {},
						raw: currentRoute
					};

					//路由挂载后处理
					routerAfter({
						history
					});

					return (
						<currentRoute.component
							route={history.route}
							routes={routes}
							render={() => {
								/*设置刷新状态*/
								//setRefresh(history.route)
							}}
						/>
					);
				}}
			/>
		));
	});

	return (
		<>
			{(_routes.length > 0) && (
				<Switch>
					{_routes}
				</Switch>
			)}
		</>
	);
}

//生成组件
function BrRoutes(props) {
	const [routes] = useState(genRoutes(props.routes));
	return (
		<>
			{routes}
		</>
	);
}

//扩展原生History
extendNativeHistory();

export default BrRoutes;