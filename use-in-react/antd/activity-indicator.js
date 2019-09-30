import * as action from '@store/action';
import utils from 'blue-utils';
import store from '@store';
import BlueQueuePipe from 'blue-queue-pipe';

const loadingQueue = new BlueQueuePipe();

//显示loading
export function showLoading(opts = {}) {
	if(loadingQueue.isEmpty()){
    loading(utils.extend({
      animating: true
    }, opts));
    console.log(+new Date());
	}
  loadingQueue.enqueue(1);
}

//关闭loading
export function closeLoading(opts = {}) {
  loadingQueue.dequeue();
  loadingQueue.isEmpty() && loading(utils.extend({
    animating: false
  }, opts));
}

//loading控制
function loading(opts) {
	store.dispatch(action.TOGGLE_ACTIVITY_INDICATOR(opts));
}