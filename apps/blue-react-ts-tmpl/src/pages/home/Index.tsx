import React, {useState} from 'react';
import {useCacheState} from '$components/BrRoutes';
import {Link} from 'react-router-dom';
import BrView from '$components/BrView';
import BrHeader from '$components/BrHeader';
import BrLayer from '$components/BrLayer';
import * as antd from '$extend-in-react/antd';

function List () {
	const list = [];
	for (let i = 0; i < 30; i++) {
		list.push((
			<div className="ba-t-c ba-pd-50" key={i}>
				{i}
			</div>
		));
	}

	return (
		<ul className="ba-reset-ul">
			{list}
		</ul>
	);
}

function Index ( props: any ) {

	const {
		setState,
		getState
	} = useCacheState();

	const [showLayer, setShowLayer] = useState(getState('showLayer', false));

	setState({
		showLayer
	});

	return (
		<BrView routes={props.routes}>

			<BrHeader centerControl={{
				title: 'HOME'
			}}/>

			{/*弹层组件*/}
			<BrLayer showStatus={showLayer} click={() => {
				setShowLayer(!showLayer);
			}}>
				<div className={"ba-pd-15 ba-bg-white"}>
					123
				</div>
			</BrLayer>

			<div className={"ba-pd-14 ba-t-c"}>
				<button className={"ba-btn ba-btn-primary"} onClick={() => {
					setShowLayer(!showLayer);
				}}>
					toggleLayer
				</button>
			</div>

			<div>
				<div className="ba-pd-14 ba-t-c">
					Home Index
				</div>

				<div className="ba-t-c ba-pd-tb-50">
					<Link to="/index-children" className="ba-pd-10">
						link to Index Children
					</Link>
				</div>

				<div className="ba-t-c ba-pd-tb-50">
					<Link to="/formik" className="ba-pd-10">
						Formik
					</Link>
				</div>

				<div className="ba-t-c ba-pd-tb-50">
					<Link to="/components" className="ba-pd-10">
						link to Components
					</Link>
				</div>

				<div className="ba-t-c ba-pd-tb-50">
					<Link to="/components/2/3" className="ba-pd-10">
						link to Components
					</Link>
				</div>

				<div className="ba-t-c ba-pd-10">
					<button type="button" className="ba-btn ba-btn-primary" onClick={( e ) => {
						antd.showLoading();
						setTimeout(() => {
							antd.hideLoading();
						}, 3000);
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