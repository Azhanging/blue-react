import './index.scss';
import React from 'react';
import store from '@store';
import * as dispatch from '@store/dispatch';
import { renderClassName } from "$assets/js/render";
import history from '@router';
import utils from 'blue-utils';
import BrTabBarIcon from '../BrTabBarIcon';

//计算子菜单的位置
function computeSubMenuPosition(opts = {}) {
  const { menuElm } = opts;
  setTimeout(() => {
    //导航
    const tabBar = document.querySelector('#tabBar');
    //导航宽度
    const tabBarWidth = tabBar.offsetWidth;
    //item的宽度
    const menuElmWidth = menuElm.offsetWidth;
    //item的left
    const menuElmLeft = menuElm.offsetLeft;
    //子菜单
    const submenuElm = menuElm.lastElementChild;
    //子菜单的宽度
    const submenuElmWidth = submenuElm.offsetWidth;

    let left = menuElmLeft + (menuElmWidth - submenuElmWidth) / 2;

    if (left + submenuElmWidth > tabBarWidth) {
      submenuElm.style.left = 'initial';
      submenuElm.style.right = 0;
    } else {
      submenuElm.style.right = 'initial';
      submenuElm.style.left = `${left}px`;
    }
  });
}

//设置导航子菜单状态
export function setTabBarSubmenuIndex(index) {
  dispatch.SET_VIEW({
    tabBarSubmenuIndex: index
  });
}

export function hideTabBarSubmenu() {
  setTabBarSubmenuIndex(-1);
}

//菜单的路由跳转
function routerTo(event, tabBarItem, index) {
  event.preventDefault();
  const { to, children } = tabBarItem;
  const tabBarSubMenuIndex = store.getState().view.tabBarSubmenuIndex;
  //存在子菜单
  if (children && children.list && utils.isArray(children.list.items)) {
    //当前的index
    const currentIndex = ((index === tabBarSubMenuIndex) ? -1 : index);
    //设置子菜单的状态
    setTabBarSubmenuIndex(currentIndex);
    (currentIndex !== -1) && computeSubMenuPosition.call(this, {
      menuElm: event.currentTarget
    });
  } else {
    //设置子菜单的状态
    hideTabBarSubmenu();
    //非子菜单
    if (utils.isStr(to)) {
      history.push(to);
    } else if (utils.isFunction(to)) {
      to.call(this);
    }
  }
}

//导航组件
function BrTabBar(props) {

  const {
    list = [],
    unActiveClassName = "bz-t-666",
    activeClassName = "",
    activeIndex = 0
  } = props;

  return (
    <div className="br-tab-bar" id="tabBar" style={{
      backgroundColor: 'white'
    }}>

      {/*底部导航列表*/}
      <div className="br-tab-bar-list-container">
        <div className="br-tab-bar-list">
          {/*跳转*/}
          {list.map((item, index) => (
            <a className={renderClassName([
              "br-tab-bar-item",
              activeIndex !== index ? unActiveClassName : activeClassName
            ])}
               key={`br-tab-bar-item-${index}`}
               onClick={(event) => {
                 routerTo(event, item, index);
               }}
            >

              {(item.icon &&
                <div>
                  <BrTabBarIcon icon={item.icon} activeIndex={activeIndex} currentIndex={index}/>
                </div>
              )}

              {/*内容以及左右方向的icon*/}
              {item.text && (
                <div className="br-tab-bar-content bz-flex bz-flex-ai-c bz-flex-jc-c">
                  {item.text}
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrTabBar;