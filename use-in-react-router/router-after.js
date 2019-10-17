import { setTabBarName } from "$components/BrTabBar";
import { routerMeta } from '@router';
import config from '@config';
import utils from 'blue-utils';
import NProgress from 'nprogress';

//路由挂载后执行（和vue项目不一致，所有的meta在Routes render中才能获取到rawRoute的信息）
function routerAfter(opts = {}) {
  const { history } = opts;
  const { meta } = history.route;
  //设置 tabBar name
  setTabBarName(meta.tabBar);
  //设置路由标识
  routerMeta.setCurrentRouteID(meta.routeID);
  //设置标题
  document.title = meta.title || config.view.title;
  //关闭进度
  NProgress.done();
  //执行after hook
  afterHook(meta);
}

//after后钩子
function afterHook(meta) {
  const afterHook = meta.afterHook;
  const { unAfterHook } = config.router.hooks;
  //目标路由的hook处理
  if (afterHook) {
    utils.hook(null, afterHook);
  } else {
    utils.hook(null, unAfterHook);
  }
}

export default routerAfter;