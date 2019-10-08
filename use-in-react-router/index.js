import routerBefore from './router-before';

//设置history的监听
function setHistoryListen(history) {
//添加路由监听
  history.listen(function () {
    routerBefore({
      history
    });
  });
}

//初始化的时候不会走listen,手动触发popState
function dispatchPopStateEvent() {
  const popStateEvent = new Event('popstate');
  popStateEvent.state = null;
  window.dispatchEvent(popStateEvent);
}

//扩展history
function extendHistory(history) {

  //路由后退规则,如果有具体的路由，否则走根路径
  history.$goBack = function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      history.push('/');
    }
  };

  //匹配路由的路径组，返回布尔值
  history.$matchRoutes = function (routesRegExp = []) {
    const path = this.location.pathname;
    for (let i = 0; i < routesRegExp.length; i++) {
      const routerRegExp = routesRegExp[i];
      routerRegExp.lastIndex = 0;
      if (routerRegExp.test(path)) {
        return true;
      }
    }
    return false;
  };

  //获取参数
  history.$getParam = function (key) {
    return this.location.params[key] || '';
  };

}

//使用到history
export function useInReactRouter(history) {
  //设置history的配置的信息
  history.config = {
    params: {
      back_url: 'back_url'
    }
  };
  //设置history的监听
  setHistoryListen(history);
  //手动触发事件
  dispatchPopStateEvent();
  //扩展history
  extendHistory(history);
}

