import React from 'react';
import config from '@config';
import history from '@router';
import './index.scss';

//左边的控制操作
function back(path) {
	if (path) {
		history.push(path);
	} else {
		history.$goBack();
	}
}

//公共header组件
function BrHeader(props) {
	const {
		style,
		advertisement,    //广告位插槽
		leftControl = {
			render: ``,
			style: {},
			backPath: ``
		},      //左控制插槽
		rightControl = {
			render: ``,
			style: {}
		},     //右控制插槽
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
						<div className="bc-flex bc-flex-ai-c">
							<a className="br-header-btn br-header-btn-icon" onClick={(e) => {
								back({
									path: leftControl.backPath
								});
								e.preventDefault();
							}}>
								<i className="br-icon br-icon-left bc-f-16"></i>
							</a>
							<a className="br-header-btn br-header-btn-icon" onClick={(e) => {
								history.push(config.path.home);
								e.preventDefault();
							}}>
								<i className="br-icon br-icon-home bc-f-16"></i>
							</a>
						</div>
					)}
				</div>

				{/*标题*/}
				<div className="br-header-title" style={centerControl.style}>
					{centerControl.render || centerControl.title || config.view.title}
				</div>

				{/*右边操作*/}
				<div className="br-header-control bc-t-r" style={rightControl.style}>
					{rightControl.render}
				</div>
			</div>
		</div>
	);
}

export default BrHeader;