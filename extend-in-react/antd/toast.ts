import {Toast} from 'antd-mobile';
import BlueQueuePipe from 'blue-queue-pipe';

//loading队列
const loadingQueue = new BlueQueuePipe();

interface FN {
	(): void;
}

//打开loading
export function showLoading ( opts: {
	content?: string;
	duration?: number;
	onClose?: () => void;
	mask?: boolean;
} = {} ) {
	if (loadingQueue.isEmpty()) {
		const {
			content = `数据加载中...`,
			duration = 0,
			onClose = () => {
			},
			mask = true
		} = opts;
		Toast.loading(content, duration, onClose, mask);
	}
	loadingQueue.enqueue(1);
}

//关闭loading
export function hideLoading ( hideAllLoading = false ) {
	if (hideAllLoading === true) {
		loadingQueue.clear();
		Toast.hide();
	} else {
		loadingQueue.dequeue();
		loadingQueue.isEmpty() && Toast.hide();
	}
}