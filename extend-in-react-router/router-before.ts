//@ts-ignore
import NProgress from 'nprogress';
import { routerID } from "@router";

//路由routerBefore执行
function routerBefore() {
  //设置路由标识
  routerID.setCurrentID();
  //显示进度条
  NProgress.start();
}

export default routerBefore;