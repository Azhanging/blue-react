import React from 'react';
import store from '@store';
import * as dispatch from '@store/dispatch';
import { renderClassName } from "$assets/js/render";
import { useSelector } from 'react-redux';
import history from '@router';
import utils from 'blue-utils';
import BrTabBarIcon from '../BrTabBarIcon';
import './index.scss';

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
export function setTabBarSubmenuIndex(opts = {}) {
  const { tabBarSubmenuIndex } = opts;
  dispatch.SET_VIEW({
    tabBarSubmenuIndex
  });
}

function routerTo(event, tabBarItem, index) {

  event.preventDefault();

  const { to, children } = tabBarItem;

  const tabBarSubMenuIndex = store.getState().view.tabBarSubmenuIndex;

  //存在子菜单
  if (children && children.list && utils.isArray(children.list.items)) {

    //当前的index
    const currentIndex = ((index === tabBarSubMenuIndex) ? -1 : index);

    //设置子菜单的状态
    setTabBarSubmenuIndex({
      tabBarSubmenuIndex: currentIndex
    });

    (currentIndex !== -1) && computeSubMenuPosition.call(this, {
      menuElm: event.currentTarget
    });
  } else {
    //设置子菜单的状态
    setTabBarSubmenuIndex({
      tabBarSubmenuIndex: -1
    });
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
    unActiveClassName = "bc-t-666",
    activeClassName = "",
    activeIndex = 0
  } = props;

  //从store中获取到submenu的索引
  const tabBarSubMenuIndex = useSelector((state) => {
    return state.view.tabBarSubmenuIndex;
  });

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
              item.className,
              activeIndex !== index ? unActiveClassName : activeClassName
            ])}
               style={item.style}
               key={`br-tab-bar-item-${index}`}
               onClick={(event) => {
                 routerTo(event, item, index);
               }}
            >

              {/*方向为top的时候出现*/}
              {(item.icon && item.icon.direction && (item.icon.direction === 'Top')) &&
              <div>
                <BrTabBarIcon icon={item.icon} activeIndex={activeIndex} currentIndex={index}/>
              </div>
              }

              {/*内容以及左右方向的icon*/}
              {item.content && (
                <div className="br-tab-bar-content bc-flex bc-flex-ai-c bc-flex-jc-c">

                  {/*方向为left的时候出现*/}
                  {(item.icon && item.icon.direction && (item.icon.direction === 'Left')) && (
                    <BrTabBarIcon icon={item.icon} activeIndex={activeIndex} currentIndex={index}/>
                  )}

                  <span style={{
                    [`padding${item.icon && item.icon.direction && (item.icon.direction === 'Top' &&
                      item.icon.direction !== 'Left' && item.icon.direction !== 'Right') ? 'Top' : (item.icon && item.icon.direction)}`]: `4px`,
                    fontSize: `${item.content.fontSize}px`,
                    ...item.content.style
                  }} className={item.content.className}>
                    {item.content.value}
                  </span>

                  {/*方向为right的时候出现*/}
                  {(item.icon && item.icon.direction && (item.icon.direction === 'Right')) && (
                    <BrTabBarIcon icon={item.icon} activeIndex={activeIndex} currentIndex={index}/>
                  )}
                </div>
              )}

              {/*方向为bottom的时候出现*/}
              {(item.icon && item.icon.direction && (item.icon.direction === 'Bottom')) && (
                <div>
                  <BrTabBarIcon icon={item.icon} activeIndex={activeIndex} currentIndex={index}/>
                </div>
              )}

              {/*子菜单*/}
              <div className="tab-bar-submenu" style={{
                display: tabBarSubMenuIndex === index ? '' : 'none'
              }}>
                {/*子菜单列表容器*/}
                {(item.children) && (
                  <div className="tab-bar-submenu-list-wrap" style={item.children.style}>
                    {/*子菜单列表*/}
                    {(item.children.list) && (
                      <div className="tab-bar-submenu-list" style={item.children.list.style}
                           key={`tab-bar-submenu-list-${index}`}>
                        {item.children.list.items.map((submenu, index) => (
                          (item.children.list.items.length > 0) && (
                            <div className={renderClassName([
                              "tab-bar-submenu-list-item bc-t-hide",
                              submenu.className
                            ])}
                                 key={`tab-bar-submenu-list-item-${index}`}
                                 style={submenu.style}
                            >
                              <div
                                className={renderClassName([item.children.unActiveClassName, submenu.link && submenu.link.className])}
                                style={submenu.link && submenu.link.style}
                                onClick={(event) => {
                                  routerTo(event, submenu, index);
                                }}
                              >
                                <span style={{
                                  fontSize: `${submenu.content.fontSize}px`,
                                  ...submenu.content.style
                                }}>
                                  {submenu.content.value}
                                </span>
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/*子菜单箭头容器*/}
                {(item.children && item.children.arrow) && (
                  <div className="tab-bar-submenu-arrow-wrap">
                    {/*子菜单箭头*/}
                    <i className="tab-bar-submenu-arrow" style={{
                      borderTop: `7px solid ${item.children.arrow.background}`
                    }}/>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BrTabBar;