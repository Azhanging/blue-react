import React from 'react';
import { Link } from 'react-router-dom';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';

function List() {

	const list = [];

	for (let i = 0; i < 10; i++) {
		list.push((
			<div className="bc-t-c bc-pd-50" key={i}>
				{i}
			</div>
		));
	}

	return (
		<ul className="bc-reset-ul">
			{list}
		</ul>
	);
}

function Index(props) {
	return (
		<BrView routes={props.routes}>
			<BrHeader centerControl={{
				title: '首页'
			}}/>
			<div>
				<div className="bc-pd-14 bc-t-c">
					Home Index
				</div>

				<div className="bc-t-c bc-pd-tb-50">
					<Link to="/index-children" className="bc-pd-10">
						link to Index Children
					</Link>
				</div>

				<div className="bc-t-c bc-pd-tb-50">
					<Link to="/components" className="bc-pd-10">
						link to Components
					</Link>
				</div>

				<div className="bc-t-c bc-pd-10">
					<button type="button" className="bc-btn bc-btn-primary" onClick={(e) => {
						React.$antd.showLoading();
					}}>
						loading...
					</button>
				</div>

				<List/>

			</div>
		</BrView>
	);
}

export default Index;