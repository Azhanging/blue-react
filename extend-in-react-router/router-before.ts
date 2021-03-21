import NProgress from 'nprogress';
import utils from 'blue-utils';
import { routerID } from "@router";
import history from "@router";

//路由routerBefore执行
function routerBefore() {
  //设置路由标识
  routerID.setCurrentID();
  //显示进度条
  NProgress.start();
  //项目内使用的before each
  const { navigator } = history;
  utils.hook(null, history.beforeHook);
}

export default routerBefore;