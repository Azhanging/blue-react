import React from 'react';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';

function Index(props) {

	return (
		<BrView routes={props.routes}>
			<BrHeader centerControl={{
				title: `Components`
			}}/>
			<div>
				<div className="bz-pd-14 bz-t-c">
					Components
				</div>
			</div>
		</BrView>
	);
}

export default Index;