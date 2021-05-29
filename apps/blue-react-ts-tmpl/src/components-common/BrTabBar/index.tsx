import './index.scss';
import React from 'react';
import {renderClassName} from "$assets/js/render";
import history from '@router';
import utils from 'blue-utils';
import BrTabBarIcon from './BrTabBarIcon';
import {TabBarItem} from './types';


//菜单的路由跳转
function routerTo ( this: any, tabBarItem: TabBarItem ) {
	const {to} = tabBarItem;
	if (utils.isStr(to)) {
		history.push(to as string);
	} else if (utils.isFunction(to)) {
		(to as Function).call(this);
	}
}

//导航组件
function BrTabBar ( props: any ) {

	const {
		list = [],
		unActiveClassName = "ba-t-666",
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
					{list.map(( item: TabBarItem, index: number ) => (
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
								<div className="br-tab-bar-content ba-flex ba-flex-ai-c ba-flex-jc-c">
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