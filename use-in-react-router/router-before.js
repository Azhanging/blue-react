import NProgress from 'nprogress';
import utils from 'blue-utils';
import * as antd from '$use-in-react/antd';
import { setFocusStatus } from '$assets/js/device';
import { getWeChatConfig } from '$wechat';
import { hideTabBarSubmenu } from '$components/BrTabBar';

//pageOffset节流
const pageOffsetDebounce = utils.debounce(function () {
  window.pageXOffset = 0;
  window.pageYOffset = 0;
}, 10);

//路由routerBefore执行
function routerBefore() {
  //显示进度条
  NProgress.start();
  //关闭所有的loading
  antd.hideLoading(true);
  //初始化page位置
  pageOffsetDebounce();
  //设置focus状态
  setFocusStatus(false);
  //隐藏子菜单
  hideTabBarSubmenu();
  //获取微信配置信息
  getWeChatConfig();
}

export default routerBefore;