import React from 'react';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';

function Children() {
	return (
		<BrView router={{
			level: 2
		}}>
			<BrHeader centerControl={{
				title: '子页面'
			}}/>
			<div className="bc-t-c">
				index children
			</div>
		</BrView>
	)
}

export default Children;