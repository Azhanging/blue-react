import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import utils from 'blue-utils'
import BlueQueuePipe from 'blue-queue-pipe';
import routerAfter from '$use-in-react-router/router-after';

//历史队列
const historyQueue = new BlueQueuePipe({
  methods: {
    shift() {
      return this.queue.shift();
    }
  }
});

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
function extendNativeHistory(history) {

  const goHistory = History.prototype.go;

  History.prototype.go = function (n) {
    if (n === -1) {
      historyQueue.enqueue({
        type: `back`,
        url: history.$getFullPath()
      });
    } else {
      goHistory.call(this, n);
    }
  }
}

//缓存
const cache = {
  //设置page的状态
  setState() {
  },
  //获取状态
  getState() {
  },
  //删除状态
  removeState() {
  },
  //状态存储
  state: {}
};

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
          const { history } = routeProps;

          //设置路由内部route数据
          history.route = {
            ...routeProps.match,
            query: utils.extend({}, routeProps.location.query),
            meta: currentRoute.meta || {},
            raw: currentRoute
          };

          console.log(history.action);

          //路由挂载后处理
          routerAfter({
            history
          });

          return (
            <currentRoute.component
              cache={cache}
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

//路由的刷新状态,这里涉及到beforeRouteUpdate的情况下需要使用
//避免keep-alive的缓存机制
function matchParamsRedirect({
  route
}) {
  const { params, query } = route;
  const { params: metaParams, query: metaQuery } = route.meta;

  //检查params一致性
  if (metaParams !== null) {
    for (let key in params) {
      if (!params.hasOwnProperty(key)) continue;
      if (metaParams[key] !== params[key]) {
        return true;
      }
    }
  }

  //检查query一致性
  if (metaQuery !== null) {
    for (let key in query) {
      if (!query.hasOwnProperty(key)) continue;
      if (metaQuery[key] !== query[key]) {
        return true;
      }
    }
  }

  return false;
}

//匹配强制刷新的列表
function matchUnforcedListRedirect({
  fromRoute,
  toRoute
}) {
  const { refresh } = fromRoute.meta;
  const { unforcedList } = refresh;
  const { fullPath: toRouteFullPath } = toRoute;
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

//生成组件
function BrRoutes(props) {

  const { routes: _routes, history } = props;

  const [routes] = useState(genRoutes(_routes));

  //必须有history
  if (!history || !history.location) {
    return (<div>history is not history module create</div>);
  }

  //获取缓存
  cache.getState = function (stateKey, initValue) {
    const { key } = history.location;
    const state = cache.state[key] || {};
    if (stateKey) {
      return state[stateKey] || initValue;
    }
    return state;
  };

  //设置key对于的缓存信息
  cache.setState = function (state) {
    const { key } = history.location;
    cache.state[key] = state;
  };

  cache.removeState = function () {
    const { meta } = history.route;
    const { refresh } = meta;
    if (!historyQueue.isEmpty()) {
      //如果是back
      refresh.status = true;
      //回到初始化的query和params
      meta.query = null;
      meta.params = null;
      historyQueue.useMethod('shift');
    }
  };

  //扩展原生History
  extendNativeHistory(history);

  return (
    <>
      {routes}
    </>
  );
}

export default BrRoutes;