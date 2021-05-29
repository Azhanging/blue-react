import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import * as dispatch from '@store/dispatch';
import BrTabBar from '$components/BrTabBar';
import homeTabBar from './home-tab-bar';
import componentTabBar from './component-tab-bar';
import {TTabBarList} from './tabbar-type';

//所有TabBar配置
const allTabBar: {
	[ propName: string ]: TTabBarList
} = {
	'home': homeTabBar,
	'components': componentTabBar
};

function activeTabBar ( setActiveIndex: Function, tabBarName: string ) {
	//匹配到对应导航配置
	const nav = allTabBar[ tabBarName ];
	if (nav) {
		setActiveIndex(nav.active());
		//没有配置到导航配置，直接设置为没有导航
		dispatch.VIEWS({
			tabBar: {
				name: false
			}
		});
	}
}


//项目tabbar
function WTabBar () {

	//選中索引位置
	const [activeIndex, setActiveIndex] = useState(-1);

	const tabBarName: string = useSelector(( state: any ) => state.views.tabBar.name);

	//当前的tabBar列表
	const tabBarList = (() => {
		const currentNav = allTabBar[ tabBarName ];
		return currentNav && currentNav.list.items;
	})();

	useEffect(() => {
		//tabBarName更新后，重新选择tabBar的索引位置
		activeTabBar(setActiveIndex, tabBarName);
	}, [tabBarName]);

	return (
		<>
			{tabBarList && (
				<BrTabBar list={tabBarList} activeIndex={activeIndex} activeClassName="ba-t-base"/>
			)}
		</>
	);
}

export default WTabBar;