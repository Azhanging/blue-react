import React, { Suspense } from 'react';
import SuspenseLoading from '$components/SuspenseLoading';
import ActivityIndicator from '$components/ConnectActivityIndicator';

//主App节点
function App(props) {
  return (
    <Suspense fallback={<SuspenseLoading/>}>
      {props.children}
      {/*loading toast*/}
      <ActivityIndicator/>
    </Suspense>
  );
}

export default App;
