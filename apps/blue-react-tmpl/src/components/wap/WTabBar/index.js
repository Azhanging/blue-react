import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as dispatch from '@store/dispatch';
import BrTabBar from '$components/BrTabBar';
import homeTabBar from './home-tab-bar';
import componentTabBar from './component-tab-bar';

function activeTabBar(allTabBar, setActiveIndex, tabBarName) {
  //匹配到对应导航配置
  const nav = allTabBar[tabBarName];
  if (nav) {
    nav.active({
      setActiveIndex
    });
  } else if (tabBarName !== false) {
    //没有配置到导航配置，直接设置为没有导航
    dispatch.SET_VIEW({
      tabBar: false
    });
  }
}


//所有TabBar配置
const allTabBar = {
  'home': homeTabBar,
  'components': componentTabBar
};

//项目tabbar
function WTabBar() {

  //選中索引位置
  const [activeIndex, setActiveIndex] = useState(-1);

  const tabBarName = useSelector((state) => state.view.tabBar);

  //当前的tabBar列表
  const tabBarList = (() => {
    const currentNav = allTabBar[tabBarName];
    return currentNav && currentNav.list.items;
  })();

  useEffect(() => {
    //tabBarName更新后，重新选择tabBar的索引位置
    activeTabBar(allTabBar, setActiveIndex, tabBarName);
  }, [tabBarName]);

  return (
    <>
      {tabBarList && (
        <BrTabBar list={tabBarList} activeIndex={activeIndex} activeClassName="bc-t-danger"/>
      )}
    </>
  );
}

export default WTabBar;