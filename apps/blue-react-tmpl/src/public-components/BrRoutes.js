import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import utils from 'blue-utils'
import routerAfter from '$use-in-react-router/router-after';

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

//缓存
const cache = {
  key: '',
  list: {}
};

//生成路由
export function genRoutes(routes, path) {
  const _routes = [];
  //排序路由
  sortRoutes(routes);
  //设置路由jsx规则
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
          const { history } = routeProps;
          const { location } = history;

          //设置路由内部route数据
          history.route = {
            ...routeProps.match,
            query: utils.extend({}, routeProps.location.query),
            meta: CurrentRoute.meta || {},
            raw: CurrentRoute
          };

          //路由挂载后处理
          routerAfter({
            history
          });

          const component = (<CurrentRoute.component route={routeProps.history.route} routes={routes}/>);

          cache.key = location.key;

          //设置组件缓存
          cache.list[location.key] = {
            component
          };

          console.log(cache);

          return component;
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
function Routes(props) {
  const [routes] = useState(genRoutes(props.routes));
  return (
    <>
      {routes}
    </>
  );
}

export default Routes;