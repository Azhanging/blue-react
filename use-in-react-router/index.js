import config from '@config';
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

  //获取当前地址href，直接获取location.href会出现路由未更新前的地址（分享全路径需要使用）
  history.$getHref = function () {
    const mode = this.mode;
    const origin = window.location.origin;
    const path = this.$getModePath();
    if (mode === 'hash') {
      return `${origin}/#${path}`;
    } else if (mode === 'history') {
      return `${origin}${path}`;
    }
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
    return this.route.params[key] || '';
  };

  //获取meta
  history.$getMeta = function () {
    return this.route.meta;
  };

  //获取mode相关的path
  history.$getModePath = function () {
    const mode = this.mode;
    const { pathname, search } = this.location
    const path = `${pathname}${search}`;
    if (mode === 'hash') {
      return `/#${path}`;
    } else if (mode === 'history') {
      return `${path}`;
    }
  };
}

//使用到history
export function useInReactRouter(history) {
  //设置history的配置的信息
  history.config = {
    params: {
      backUrl: 'backUrl'
    }
  };
  //设置路由模式
  history.mode = config.router.mode;
  //设置history的监听
  setHistoryListen(history);
  //手动触发事件
  dispatchPopStateEvent();
  //扩展history
  extendHistory(history);
}

