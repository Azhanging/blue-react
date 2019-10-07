import React, { Suspense } from 'react';
import SuspenseLoading from '$components/SuspenseLoading';
import WTabBar from '@components/wap/WTabBar';

//主App节点
function App(props) {
	return (
		<div className="bc-f-14rp bc-t-333">
      <Suspense fallback={<SuspenseLoading/>}>
        {props.children}
      </Suspense>
			{/*导航*/}
			<WTabBar/>
		</div>
	);
}

export default App;
