import React, { useContext, useState, useEffect, useCallback } from 'react';
import { setRefresh } from './refresh';
import { routeLeave } from './hooks';

//创建Context
export const BrCacheContext = React.createContext({});

BrCacheContext.displayName = `BrCache`;

//默认定位
function getDefaultPosition() {
  return {
    x: 0,
    y: 0
  };
}

//缓存
const cache = {
  //获取缓存
  getState(opts = {}) {
    const { routeKey, stateKey, initValue } = opts;
    const state = cache.state[routeKey] || {};
    if (stateKey) {
      return state[stateKey] || initValue;
    }
    return state;
  },

  //设置key对于的缓存信息
  setState(opts = {}) {
    const { routeKey, state } = opts;
    const cacheState = cache.state;
    cacheState[routeKey] = state;
  },

  //设置偏移量
  setPosition(opts = {}) {
    const { routeKey, position } = opts;
    const cachePosition = cache.position;
    cachePosition[routeKey] = position;
  },

  getPosition(opts = {}) {
    const { routeKey } = opts;
    return cache.position[routeKey] || getDefaultPosition();
  },

  //状态存储
  state: {},

  //定位信息
  position: {}
};

//缓存Context
export function Provider(props) {
  return (
    <BrCacheContext.Provider value={props}>
      {props.children}
    </BrCacheContext.Provider>
  );
}

function useRouteState() {
  const { history } = useContext(BrCacheContext);
  const { route } = history;
  const [routeKey] = useState(route.key);
  return {
    history,
    route,
    routeKey
  };
}

//状态相关钩子
export function useCacheState() {
  const {
    routeKey
  } = useRouteState();

  const getState = useCallback(function getState(stateKey, initValue) {
    return cache.getState({
      routeKey,
      stateKey,
      initValue
    });
  }, [routeKey]);

  const setState = useCallback(function setState(state) {
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
export function useCachePosition() {
  const {
    routeKey
  } = useRouteState();

  const setPosition = useCallback(function setPosition(position = getDefaultPosition()) {
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
export function useCacheRefresh() {
  const {
    routeKey,
    history,
    route
  } = useRouteState();

  //设置刷新状态
  useEffect(() => {
    setRefresh(route);
    return () => {
      //移除后删除缓存
      routeLeave({
        history,
        routeKey
      });
    };
    // eslint-disable-next-line
  }, []);
}

//cache hook
/*
export function useCache() {
  const { history } = useContext(BrCacheContext);
  const { route } = history;
  const [routeKey] = useState(route.key);

  const getState = useCallback(function getState(stateKey, initValue) {
    return cache.getState({
      routeKey,
      stateKey,
      initValue
    });
  }, [routeKey]);

  const setState = useCallback(function setState(state) {
    return cache.setState({
      routeKey,
      state
    });
  }, [routeKey]);

  const setPosition = useCallback(function setPosition(position = getDefaultPosition()) {
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

  //设置刷新状态
  useEffect(() => {
    setRefresh(route);
    return () => {
      //移除后删除缓存
      routeLeave({
        history,
        routeKey
      });
    };
    // eslint-disable-next-line
  }, []);

  return {
    //设置缓存状态
    setState,
    //获取缓存状态
    getState,
    //设置定位
    setPosition,
    //获取定位
    getPosition
  };
}*/
