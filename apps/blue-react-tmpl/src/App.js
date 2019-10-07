import React, { Suspense } from 'react';
import SuspenseLoading from '$components/SuspenseLoading';

//主App节点
function App(props) {
	return (
		<div className="bc-f-14rp bc-t-333">
      <Suspense fallback={<SuspenseLoading/>}>
        {props.children}
      </Suspense>
		</div>
	);
}

export default App;
