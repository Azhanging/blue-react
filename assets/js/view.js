import * as dispatch from '@store/dispatch';
import utils from 'blue-utils';
import config from '@config';
import { setTabBarSubmenuIndex } from '$components/BrTabBar';

//设置视图相关
export function view() {
  setEvent();
}

//scroll事件的处理
const scrollHandler = utils.debounce(function () {
  const top = document.documentElement.scrollTop;
  //设置scroll top
  dispatch.SET_VIEW({
    suspend: {
      distance: top || 0
    }
  });
  //设置子菜单的状态
  setTabBarSubmenuIndex(-1);
}, 200);

//scroll事件的处理
const clickHandler = utils.debounce(function () {
  //设置子菜单的状态
  setTabBarSubmenuIndex(-1);
}, 200);

//设置scroll事件
function setEvent() {
  const addWinEvent = window.addEventListener;
  addWinEvent('scroll', scrollHandler, false);
  addWinEvent('click', clickHandler, false);
}

//浮层相关
export function suspend(state) {
  if (state.status !== false) state.status = true;
  //设置scroll top
  dispatch.SET_VIEW({
    suspend: {
      state
    }
  });
}

//导航的状态
export function tabBar(state) {
  const { name } = state;
  dispatch.SET_VIEW({
    tabBar: {
      name: (() => {
        if (name === undefined) return config.app.tabBar;
        return name;
      })()
    }
  });
}

