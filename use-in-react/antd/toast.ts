import { Toast } from 'antd-mobile';
import BlueQueuePipe from 'blue-queue-pipe';

//loading队列
const loadingQueue = new BlueQueuePipe();

//打开loading
export function showLoading(opts = {}) {
  if (loadingQueue.isEmpty()) {
    const { content = '数据加载中...', duration = 0, onClose, mask = true } = opts;
    Toast.loading(content, duration, onClose, mask);
  }
  loadingQueue.enqueue(1);
}

//关闭loading
export function hideLoading(hideAllLoading = false) {
  if (hideAllLoading === true) {
    loadingQueue.clear();
    Toast.hide();
  } else {
    loadingQueue.dequeue();
    loadingQueue.isEmpty() && Toast.hide();
  }
}