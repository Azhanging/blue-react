import { Toast } from 'antd-mobile';
import BlueQueuePipe from 'blue-queue-pipe';

//全局配置
Toast.config({
  duration: 0,
  mask: true
});

//loading队列
const loadingQueue = new BlueQueuePipe();

//打开loading
export function showLoading(opts = {}) {
  if (loadingQueue.isEmpty()) {
    const { content = '数据加载中...', duration, onClose, mask } = opts;
    Toast.loading(content, duration, onClose, mask);
  }
  loadingQueue.enqueue(1);
}

//关闭loading
export function hideLoading() {
  loadingQueue.dequeue();
  loadingQueue.isEmpty() && Toast.hide();
}