import * as dispatch from '@store/dispatch';
import utils from 'blue-utils';
import config from '@config';

//设置视图相关
export function view() {
  setEvent();
}

//scroll事件的处理
const scrollHandler = utils.debounce(function () {
  const top = document.documentElement.scrollTop;
  //设置scroll top
  dispatch.VIEW({
    suspend: {
      distance: top || 0
    }
  });
}, 200);

//设置scroll事件
function setEvent() {
  const { addEventListener } = window;
  addEventListener('scroll', scrollHandler, false);
}

//浮层相关
export function suspend(state) {
  if (state.status !== false) state.status = true;
  //设置scroll top
  dispatch.VIEW({
    suspend: {
      state
    }
  });
}

//导航的状态
export function tabBar(tarBarConfig = config.view.tabBar) {
  dispatch.VIEW({
    tabBar: tarBarConfig
  });
}

