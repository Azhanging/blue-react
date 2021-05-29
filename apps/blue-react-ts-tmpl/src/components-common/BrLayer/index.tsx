import './index.scss';
import React from 'react';
import utils from 'blue-utils';
import {useSelector} from 'react-redux';
import {renderClassName} from '$assets/js/render';

//弹层
function BrLayer ( props: any ) {

	const view = useSelector(( state: any ) => state.views.tabBar);

	const {
		showStatus,
		click
	} = props;

	return (
		<div
			className={renderClassName([
				"br-layer-container",
				!view.tabBar && "no-tab-bar"
			])}
			style={{
				display: showStatus ? '' : 'none'
			}}
			onClick={( e ) => {
				e.stopPropagation();
				utils.hook(null, click, [e]);
			}}
		>
			<div className={"br-layer"} onClick={( e ) => e.stopPropagation()}>
				{props.children}
			</div>
		</div>
	);
}

export default BrLayer;