import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'antd-mobile';

//主App节点
function App(props) {

	const [animating, setAnimation] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAnimation((animating)=>{
				return !animating;
			});
		}, 2000);
	}, []);

	return (
		<>
			{props.children}
			{/*loading*/}
			<button className="bc-btn" onClick={() => setAnimation(!animating)}>
				toggle animating
			</button>
			<ActivityIndicator toast text="loading" animating={animating}/>
		</>
	)
}

export default App;
