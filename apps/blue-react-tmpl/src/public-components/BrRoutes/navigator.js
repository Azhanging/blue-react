import BlueQueuePipe from 'blue-queue-pipe';
import { historyQueue } from "./history";

//定制history的to和from信息
const historyNavigatorQueue = new BlueQueuePipe({
  methods: {
    pop() {
      this.queue.pop();
    },
    unshift(item) {
      this.queue.unshift(item);
    }
  }
});

//设置from路由
function genRouteNavigator(history) {
  //当前queue为空是初始化状态
  if (historyNavigatorQueue.isEmpty()) {
    historyNavigatorQueue.useMethod('unshift', [history.route]);
    historyNavigatorQueue.useMethod('unshift', [history.route]);
  } else {
    historyNavigatorQueue.useMethod('pop');
    historyNavigatorQueue.useMethod('unshift', [history.route]);
  }
}

//设置路由导航
export function setRouteNavigator(history) {
  genRouteNavigator(history);
  //设置路由to,from
  history.navigator = {
    to: historyNavigatorQueue.first(),
    from: historyNavigatorQueue.last()
  };
}

//扩展原生history
export function extendNativeHistory() {
  //存储原生的go和back原型
  const goHistory = History.prototype.go;
  const backHistory = History.prototype.back;

  History.prototype.go = function (n) {
    if (n === -1) {
      historyQueue.enqueue('back');
    }
    goHistory.call(this, n);
  };

  History.prototype.back = function () {
    historyQueue.enqueue('back');
    backHistory.call(this);
  };

}