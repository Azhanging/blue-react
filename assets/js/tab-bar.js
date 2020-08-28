import config from '@config';
import * as dispatch from '@store/dispatch';

//设置菜单名
export function setTabBarName(tabBar = config.view.tabBar) {
  dispatch.VIEW({
    tabBar
  });
}