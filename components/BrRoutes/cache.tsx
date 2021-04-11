import React, {useContext, useState, useEffect, useCallback} from 'react';
import {setRefresh} from './refresh';
import {routeLeave} from './hooks';

//创建Context
export const BrRoutesCacheContext = React.createContext(null);

//set Context Component name
BrRoutesCacheContext.displayName = `BrRoutesCache`;

type TRouteKey = string;
type TStateKey = string;
type TCacheState = any;

interface TRoutePosition {
	x: number | string;
	y: number | string;
}

//默认定位
function getDefaultPosition (): TRoutePosition {
	return {
		x: 0,
		y: 0
	};
}

interface TCache {
	getState: Function;
	setState: Function;
	setPosition: Function;
	getPosition: Function;
	remove: Function;
	state: {
		[ routeKey: string ]: any;
	};
	position: {
		[ routeKey: string ]: TRoutePosition;
	};
}


//缓存
export const cache: TCache = {

	//获取缓存
	getState ( opts: {
		routeKey: TRouteKey;
		stateKey: TStateKey;
		initValue: TCacheState;
	} ) {
		const {routeKey, stateKey, initValue} = opts;
		const state = cache.state[ routeKey ] || {};
		if (stateKey) {
			if (stateKey in state) {
				return state[ stateKey ];
			}
			return initValue;
		}
		return state;
	},

	//设置key对于的缓存信息
	setState ( opts: {
		routeKey: TRouteKey;
		state: TCacheState;
	} ) {
		const {routeKey, state} = opts;
		const cacheState = cache.state;
		cacheState[ routeKey ] = state;
	},

	//设置偏移量
	setPosition ( opts: {
		routeKey: string;
		position: TRoutePosition;
	} ) {
		const {routeKey, position} = opts;
		const cachePosition = cache.position;
		cachePosition[ routeKey ] = position;
	},

	//获取偏移量
	getPosition ( opts: {
		routeKey: TRouteKey;
	} ): TRoutePosition {
		const {routeKey} = opts;
		return cache.position[ routeKey ] || getDefaultPosition();
	},

	//删除缓存state和position
	remove ( opts: {
		routeKey: TRouteKey
	} ) {
		const {routeKey} = opts;
		delete cache.state[ routeKey ];
		delete cache.position[ routeKey ];
	},

	//状态存储
	state: {},

	//定位信息
	position: {}
};

//缓存Context
export function Provider ( props: any ) {
	return (
		<BrRoutesCacheContext.Provider value={props}>
			{props.children}
		</BrRoutesCacheContext.Provider>
	);
}

//路由状态
export function useRouteState () {
	const {history}: { history: any } = useContext(BrRoutesCacheContext);
	const {route} = history;
	const [routeKey] = useState(route.key);
	return {
		history,
		route,
		routeKey
	};
}

//状态相关钩子
export function useCacheState () {
	const {
		routeKey
	} = useRouteState();

	const getState = useCallback(function getState ( stateKey, initValue ) {
		return cache.getState({
			routeKey,
			stateKey,
			initValue
		});
	}, [routeKey]);

	const setState = useCallback(function setState ( state ) {
		return cache.setState({
			routeKey,
			state
		});
	}, [routeKey]);

	return {
		getState,
		setState
	};
}

//偏移相关钩子
export function useCachePosition () {
	const {
		routeKey
	} = useRouteState();

	const setPosition = useCallback(function setPosition ( position = getDefaultPosition() ) {
		return cache.setPosition({
			position,
			routeKey
		});
	}, [routeKey]);

	const getPosition = useCallback(() => {
		return cache.getPosition({
			routeKey
		});
	}, [routeKey]);

	return {
		setPosition,
		getPosition
	}
}

//刷新相关钩子
export function useCacheRefresh () {
	const {
		history,
		route
	} = useRouteState();

	//设置刷新状态
	useEffect(() => {
		setRefresh(route);
		return () => {
			//移除后删除缓存
			routeLeave({
				history
			});
		};
		// eslint-disable-next-line
	}, []);
}
