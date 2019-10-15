import React, { useState, useContext, useMemo } from 'react';
import { Route, Switch } from 'react-router-dom';
import utils from 'blue-utils';
import { historyQueue, CacheContext } from './cache';
import { setRouteNavigator } from './navigator';
import { setHistoryListen } from './listen';
//扩张usCache
export * from './cache';

//排序路由
function sortRoutes(routes) {
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

//设置query
function setQuery(location) {
//设置参数
  location.query = utils.parseParams(utils.getLinkParams(location.search));
}

//生成路由
function genRoutes(opts = {}) {
  const {
    routes,
    path,
    routerAfter
  } = opts;
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
      routes = genRoutes({
        routes: childrenRoute,
        path: currentRoute.path,
        routerAfter
      });
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
          const { history, location } = routeProps;

          //设置query
          setQuery(location);

          //设置路由内部route数据
          history.route = {
            key: location.key,
            ...routeProps.match,
            query: utils.extend({}, location.query),
            meta: currentRoute.meta || {},
            raw: currentRoute
          };

          //设置导航to和from
          setRouteNavigator(history);

          //after后执行的钩子
          utils.hook(null, routerAfter, [{
            history
          }]);

          return (
            <currentRoute.component
              route={history.route}
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

//生成路由组件
export function BrRoutes(props) {

  const [routes] = useState(genRoutes({
    routes: props.routes,
    routerAfter: props.routerAfter
  }));

  const { history } = useContext(CacheContext);

  //只调用一次render前调用
  useMemo(() => {
    //设置监听
    setHistoryListen({
      history,
      routerBefore: props.routerBefore
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {routes}
    </>
  );
}

//扩展原生History
extendNativeHistory();