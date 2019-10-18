import config from '@config';
import * as dispatch from '@store/dispatch';

//设置菜单名
export function setTabBarName(name) {
  dispatch.SET_VIEW({
    tabBar: name || config.view.tabBar
  });
}