import config from '@config';
import { createBrowserHistory, createHashHistory } from 'history';
import { useInReactRouter } from "$use-in-react-router";
import RouterMeta from '$use-in-react-router/router-meta';

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
useInReactRouter(history);

//路由标记
export const routerMeta = new RouterMeta();

export default history;