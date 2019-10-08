import NProgress from 'nprogress';
import BlueQueuePipe from 'blue-queue-pipe';
import utils from 'blue-utils';
import * as antd from '$use-in-react/antd';
import { setFocusStatus } from '$assets/js/device';
import { getWeChatConfig } from '$wechat';
import { hideTabBarSubmenu } from '$components/BrTabBar';

//定制history的to和from信息
const historyQueue = new BlueQueuePipe({
  methods: {
    pop() {
      this.queue.pop();
    },
    unshift(item) {
      this.queue.unshift(item);
    }
  }
});

//pageOffset节流
const pageOffsetDebounce = utils.debounce(function () {
  window.pageXOffset = 0;
  window.pageYOffset = 0;
}, 10);

//设置history
function setHistory(history) {
  const { location } = history;
  //设置参数
  location.query = utils.parseParams(utils.getLinkParams(location.search));
  //设置路由to,from
  history.navigation = {
    to: historyQueue.first(),
    from: historyQueue.last()
  };
}

//设置from路由
function setRouteNavigator(history) {
  //当前queue为空是初始化状态
  if (historyQueue.isEmpty()) {
    historyQueue.useMethod('unshift', [history.location]);
    historyQueue.useMethod('unshift', [history.location]);
  } else {
    historyQueue.useMethod('pop');
    historyQueue.useMethod('unshift', [history.location]);
  }
}

//路由routerBefore执行
function routerBefore(opts = {}) {
  const { history } = opts;
  //关闭所有的loading
  antd.hideLoading(true);
  //初始化page位置
  pageOffsetDebounce();
  //设置focus状态
  setFocusStatus(false);
  //显示进度条
  NProgress.start();
  //隐藏子菜单
  hideTabBarSubmenu();
  //设置to和from
  setRouteNavigator(history);
  //设置history
  setHistory(history);
  //获取微信配置信息
  getWeChatConfig();
}

export default routerBefore;