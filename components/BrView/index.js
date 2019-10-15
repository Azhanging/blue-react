//组件样式
import './index.scss';
import React, { useState, useRef, useEffect } from 'react';
import NProgress from 'nprogress';
import utils from 'blue-utils';
import { useSelector } from 'react-redux';
import config from '@config';
import { mockViewScroll } from '$assets/js/device';
import { renderProps, renderClassName } from '$assets/js/render';
import { hideTabBarSubmenu } from '$components/BrTabBar';
import { useCache } from '$components/BrRoutes';

const viewScrollClassName = '.br-view-scroll';

//获取当前的view层elm
export function getLastViewElm() {
	const viewScrolls = document.querySelectorAll(viewScrollClassName);
	if (viewScrolls && viewScrolls.length > 0) {
		return viewScrolls[viewScrolls.length - 1];
	}
	return null;
}

//设置当前elm的scroll
export function setCurrentViewScroll(position = {
	x: 0,
	y: 0
}) {
	const lastView = getLastViewElm();
	lastView && (lastView.scrollTop = position.y);
}

//set view scroll event
export function setViewEvent(opts = {}) {
	const {
		scrollElm,
		setScroll
	} = opts;

	//scroll 节流实现
	const scrollDebounce = utils.debounce(function (event) {
		const elm = event.target;
		const scrollTop = elm.scrollTop;
		//组件内的scroll记录
		setScroll({
			y: scrollTop,
			x: 0
		});
	}, 150);

	//view scroll event
	scrollElm.addEventListener('scroll', (event) => {
		//节流处理scrollTop
		scrollDebounce(null, [event]);
		//滑动的时候也隐藏子菜单的状态
		hideTabBarSubmenu();
		//阻止scroll冒泡
		event.stopPropagation();
	}, false);
}

//ios input bug
export function inputEvent() {
	const device = config.device;
	if (device.isWap && (device.isIPhone || device.isIPad)) {
		mockViewScroll();
	}
}

//view中间层
export default function BrView(props) {
	const tabBar = useSelector((state) => state.view.tabBar);
	const {
		router = {
			level: 1
		}
	} = props;

	//设置scrollElm的ref
	const scrollElm = useRef();
	const {
		setPosition,
		getPosition
	} = useCache();


	const [scroll, setScroll] = useState(getPosition());

	useEffect(() => {
		//设置scroll事件流
		setViewEvent({
			scrollElm: scrollElm.current,
			setScroll
		});
		//初始化设置定位
		setCurrentViewScroll(scroll);
		// eslint-disable-next-line
	}, []);

	//设置定位
	useEffect(() => {
		utils.hook(null, setPosition, [scroll]);
	}, [scroll, setPosition]);

	//关闭进度
	NProgress.done();

	return (
		<div
			className={renderClassName([
				"br-view",
				!tabBar && 'no-tab-bar'
			])}
			onClick={hideTabBarSubmenu}
			onInput={inputEvent}
			style={{
				zIndex: `${(100 * (router.level || 1))}`
			}}
		>

			{/*scroll容器*/}
			<div className="br-view-scroll" ref={scrollElm}>
				{props.children}
			</div>

			{/*子路由*/}
			{props.routes}

			{/*浮动相关*/}
			{renderProps(props.suspend, {
				scroll,
				scrollElm
			})}

			{/*其他的组件*/}
			{renderProps(props.other, {
				scroll,
				scrollElm
			})}

		</div>
	)
}