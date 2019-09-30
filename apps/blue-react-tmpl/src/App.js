import React, { Suspense } from 'react';
import SuspenseLoading from '$components/SuspenseLoading';

//主App节点
function App(props) {
	return (
		<Suspense fallback={<SuspenseLoading/>}>
			{props.children}
		</Suspense>
	);
}

export default App;
