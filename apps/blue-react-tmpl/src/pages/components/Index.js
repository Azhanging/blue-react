import React from 'react';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';

function Index(props) {

	return (
		<BrView routes={props.routes}>
			<BrHeader centerControl={{
				title: `首页子页面`
			}}/>
			<div>
				<div className="bc-pd-14 bc-t-c">
					Components
				</div>
			</div>
		</BrView>
	);
}

export default Index;