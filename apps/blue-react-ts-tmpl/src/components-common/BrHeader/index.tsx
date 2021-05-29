import React from 'react';
import config from '@config';
import history from '@router';
import './index.scss';

//左边的控制操作
function back ( path: string ) {
	if (path) {
		history.push(path);
	} else {
		history.$goBack();
	}
}

//公共header组件
function BrHeader ( props: any ) {
	const {
		style,
		advertisement,    //广告位插槽
		//左边控制区域
		leftControl = {
			render: ``,
			style: {},
			backPath: ``
		},
		//右边控制区域
		rightControl = {
			render: ``,
			style: {}
		},
		//中间控制区域
		centerControl = {
			title: ``,
			render: ``,
			style: {}
		}
	} = props;
	return (
		<div className="br-header">

			{/*广告位*/}
			{advertisement}

			<div className="br-header-container" style={style}>
				{/*左边控制*/}
				<div className="br-header-control">
					{(leftControl && leftControl.render) || (
						<div className="ba-flex ba-flex-ai-c">
							<a href="" className="br-header-btn br-header-btn-icon" onClick={( e ) => {
								back(leftControl.backPath);
								e.preventDefault();
							}}>
								<i className="bp-icon bp-icon-left ba-f-16"></i>
							</a>
							<a href="" className="br-header-btn br-header-btn-icon" onClick={( e ) => {
								history.push(config.path.home);
								e.preventDefault();
							}}>
								<i className="bp-icon bp-icon-home ba-f-16"></i>
							</a>
						</div>
					)}
				</div>

				{/*标题*/}
				<div className="br-header-title" style={centerControl.style}>
					{centerControl.render || centerControl.title || config.views.title}
				</div>

				{/*右边操作*/}
				<div className="br-header-control ba-t-r" style={rightControl.style}>
					{rightControl.render}
				</div>
			</div>
		</div>
	);
}

export default BrHeader;