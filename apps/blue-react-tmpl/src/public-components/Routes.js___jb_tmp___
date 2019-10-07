import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import utils from 'blue-utils';

//排序路由
export function sortRoutes(routes) {
  routes.sort((nextRoute, currentRoute) => {
    const currentPath = currentRoute.props.path;
    //如果是index path，直接后移
    if (currentPath === '/') return -1;
    const currentRouteLevel = currentPath.split('/').length;
    const nextRouteLevel = nextRoute.props.path.split('/').length;
    return currentRouteLevel - nextRouteLevel;
  });
}

//生成路由
export function genRoutes(routes, path) {
  const _routes = [];
  routes.forEach((CurrentRoute, index) => {
    let routes = [];
    const childrenRoute = CurrentRoute.children;
    //处理多层路由链接合并问题
    if (!/^\//.test(CurrentRoute.path)) {
      CurrentRoute.path = `${path}${/\/$/.test(path) ? '' : '/'}${CurrentRoute.path}`;
    }
    //存在子路由数据，递归
    if (childrenRoute && childrenRoute.length > 0) {
      routes = genRoutes(childrenRoute, CurrentRoute.path);
    }
    //写进集合，最后给Switch渲染
    _routes.push((
      <Route
        exact={CurrentRoute.exact}
        strict={CurrentRoute.strict}
        path={CurrentRoute.path}
        key={`route-key-${index}`}
        render={(routeProps) => {
          /*这里设置route的props给到Page的组件内部*/
          routeProps.history.route = {
            ...routeProps.match,
            query: utils.extend({},routeProps.location.query),
            meta: CurrentRoute.meta || {}
          };
          return (
            <CurrentRoute.component route={routeProps.history.route} routes={routes}/>
          );
        }}
      />
    ));
  });
  //排序路由
  sortRoutes(_routes);
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
function Routes(props) {
  const [routes] = useState(genRoutes(props.routes));
  return (
    <>
      {routes}
    </>
  );
}

export default Routes;