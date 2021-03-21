import config from '@config';
import { createBrowserHistory, createHashHistory } from 'history';
import { extendInReactRouter } from "$components/BrRoutes/history";
import RouterID from '$extend-in-react-router/router-id';

//绑定路由的实例，方便外部使用
const history = (() => {
  const { mode } = config.router;
  if (mode === 'history') {
    return createBrowserHistory();
  } else if (mode === 'hash') {
    return createHashHistory();
  }
})();

//扩展router
extendInReactRouter(history);

//路由标记
export const routerID = new RouterID();

//路由触发前调用
history.beforeHook = function () {
  console.log(`beforeHook`);
};

//路由触发前调用
history.afterHook = function () {
  console.log(`afterHook`);
};

export default history;