import BlueQueuePipe from 'blue-queue-pipe';

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

//设置from路由
function genRouteNavigator(history) {
  //当前queue为空是初始化状态
  if (historyQueue.isEmpty()) {
    historyQueue.useMethod('unshift', [history.route]);
    historyQueue.useMethod('unshift', [history.route]);
  } else {
    historyQueue.useMethod('pop');
    historyQueue.useMethod('unshift', [history.route]);
  }
}

//设置路由导航
export function setRouteNavigator(history) {
  genRouteNavigator(history);
  //设置路由to,from
  history.navigator = {
    to: historyQueue.first(),
    from: historyQueue.last()
  };
}