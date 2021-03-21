//组件样式
import './index.scss';
import React, { useState, useEffect } from 'react';
import utils from 'blue-utils';
import { useSelector } from 'react-redux';
import { renderClassName } from '$assets/js/render';
import { useCachePosition, useCacheRefresh } from '$components/BrRoutes';
import { useRouteState } from '$components/BrRoutes';
import history from "@router";

//只做一次事件添加
let hasScrollEvent = false;

//处理view对于的scroll事件
let scrollDebounce = null;

//set view scroll event
export function setScrollEvent(opts = {}) {
  const {
    setScroll,
    routeKey
  } = opts;

  //scroll 节流实现
  scrollDebounce = utils.debounce(function () {
    if (history.route.key !== routeKey) return;
    const top = document.documentElement.scrollTop;
    //组件内的scroll记录
    setScroll({
      y: top,
      x: 0
    });
  }, 150);

  //只存在一个scroll事件
  if (hasScrollEvent) return;
  hasScrollEvent = true;
  //view scroll event
  window.addEventListener('scroll', (event) => {
    //节流处理scrollTop
    scrollDebounce();
    //阻止scroll冒泡
    event.stopPropagation();
  }, false);
}

//view中间层
export default function BrView(props:any) {
  const tabBar = useSelector((state) => state.view.tabBar);

  const {
    setPosition,
    getPosition
  } = useCachePosition();

  const [scroll, setScroll] = useState(getPosition());

  const {
    routeKey
  } = useRouteState();

  useEffect(() => {
    //设置scroll事件流
    setScrollEvent({
      setScroll,
      routeKey
    });
    //初始化设置定位
    document.documentElement.scrollTop = scroll.y;
    // eslint-disable-next-line
  }, []);

  //设置定位
  useEffect(() => {
    utils.hook(null, setPosition, [scroll]);
  }, [scroll, setPosition]);

  //页面刷新
  useCacheRefresh();

  return (
    <div
      className={renderClassName([
        "br-view",
        !tabBar.name && 'no-tab-bar'
      ])}
    >
      {/*子节点*/}
      {props.children}
    </div>
  )
}