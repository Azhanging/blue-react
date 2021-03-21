import './index.scss';
import React from 'react';
import { renderClassName } from "$assets/js/render";
import history from '@router';
import utils from 'blue-utils';
import BrTabBarIcon from '../BrTabBarIcon';

//菜单的路由跳转
function routerTo(tabBarItem) {
  const { to } = tabBarItem;
  if (utils.isStr(to)) {
    history.push(to);
  } else if (utils.isFunction(to)) {
    to.call(this);
  }
}

//导航组件
function BrTabBar(props:any) {

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
               onClick={() => {
                 routerTo(item);
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