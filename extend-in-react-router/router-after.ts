import utils from 'blue-utils';
import { suspend, tabBar } from "$assets/js/view";
import config from '@config';
import NProgress from 'nprogress';
import { hideLoading } from '$extend-in-react/antd';
import { setFocusStatus } from '$assets/js/device';
import { getWeChatConfig } from '$wechat';

//路由挂载后执行（和vue项目不一致，所有的meta在Routes render中才能获取到rawRoute的信息）
function routerAfter(opts = {}) {
  const { history } = opts;
  const { meta } = history.route;
  const { title, tabBar: tabBarState, suspend: suspendState = {} } = meta;
  //关闭所有的loading
  hideLoading(true);
  //设置focus状态
  setFocusStatus(false);
  //项目内使用的after each
  const { navigator } = history;
  //获取微信配置信息
  getWeChatConfig();
  //关闭进度
  NProgress.done();
  //设置标题
  document.title = title || config.views.title;
  //导航状态
  tabBar(tabBarState);
  //浮层状态
  suspend({
    status: suspendState.status,
    distance: 0
  });
  //执行after hook
  afterHook({
    meta
  });
}

//after后钩子
function afterHook(opts) {
  const { meta } = opts;
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