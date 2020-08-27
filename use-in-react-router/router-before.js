import NProgress from 'nprogress';
import * as antd from '$use-in-react/antd';
import { setFocusStatus } from '$assets/js/device';
import { getWeChatConfig } from '$wechat';

//路由routerBefore执行
function routerBefore() {
  //显示进度条
  NProgress.start();
  //关闭所有的loading
  antd.hideLoading(true);
  //设置focus状态
  setFocusStatus(false);
  //获取微信配置信息
  getWeChatConfig();
}

export default routerBefore;