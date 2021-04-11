import React, {ReactFragment, ReactNode, useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import {setHistory} from './history';
import {extendNativeHistory} from './navigator';
import {setMeta} from './meta';
import {THistory, TRoutesRoute} from './types';

//扩张usCache
export * from './cache';

//扩展原生History
extendNativeHistory();

//排序路由
function sortRoutes ( routes: TRoutesRoute[] ): void {
	routes.sort(( currentRoute, nextRoute ) => {
		const currentPath = currentRoute.path;
		const nextPath = nextRoute.path;
		//如果是index path，直接后移
		if (currentPath === '/') return 1;
		const currentRouteLevel = currentPath.split('/').length;
		const nextRouteLevel = nextPath.split('/').length;
		return nextRouteLevel - currentRouteLevel;
	});
}

//生成路由
function genRoutes ( opts: {
	routes: TRoutesRoute[];
	path?: string;
} ): ReactFragment {
	const {
		routes,
		path
	} = opts;
	const _routes: ReactNode[] = [];
	//排序路由
	sortRoutes(routes);
	//设置路由jsx规则
	routes.forEach(( currentRoute: TRoutesRoute, index: number ) => {
		let routes: ReactFragment;
		const childrenRoute = currentRoute.children;
		//处理多层路由链接合并问题
		if (!/^\//.test(currentRoute.path)) {
			currentRoute.path = `${path}${/\/$/.test(path) ? '' : '/'}${currentRoute.path}`;
		}
		//存在子路由数据，递归
		if (childrenRoute && childrenRoute.length > 0) {
			routes = genRoutes({
				routes: childrenRoute,
				path: currentRoute.path
			});
		}

		//写进集合，最后给Switch渲染
		_routes.push((
			<Route
				exact={currentRoute.exact}
				strict={currentRoute.strict}
				path={currentRoute.path}
				key={`route-key-${index}`}
				render={( routeProps ) => {

					const {history} = routeProps;

					/*设置meta信息*/
					setMeta(currentRoute);

					//设置
					setHistory({
						currentRoute,
						routeProps
					});

					return (
						<currentRoute.component
							route={(history as THistory).route}
							routes={routes}
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

//必须通过render props来渲染 把genRoutes带入到指定的slot中渲染
function renderProps ( opts: any ): ReactNode {
	const {render, props} = opts;
	if (typeof render !== 'function') {
		return (
			<div style={{
				textAlign: 'center',
				padding: '14px',
				color: 'red',
				fontWeight: 'bold'
			}}>
				use render props in this components
			</div>
		);
	} else {
		return render(props.routes);
	}
}

//生成路由组件
export function BrRoutes ( props: any ) {

	const [routes] = useState(genRoutes({
		routes: props.routes
	}));

	return (
		<>
			{renderProps({
				render: props.render,
				props: {
					routes
				}
			})}
		</>
	);
}