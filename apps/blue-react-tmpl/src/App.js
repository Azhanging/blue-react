import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import SuspenseLoading from '$components/SuspenseLoading';
import WTabBar from '@components/wap/WTabBar';
import BrSuspend from "$components/BrSuspend";

//主App节点
function App(props:any) {
  const view = useSelector((state) => state.view);
  return (
    <div className="bz-f-28rpx bz-t-333">
      {/*入口层*/}
      <Suspense fallback={<SuspenseLoading/>}>
        {props.children}
      </Suspense>
      {/*浮动层*/}
      <BrSuspend scrollDistance={view.suspend.distance} show={view.suspend.status} backToTop={(
        <i className="bp-icon bp-icon-go-top bz-f-20 bz-t-666"></i>
      )}/>
      {/*导航*/}
      <WTabBar/>
    </div>
  );
}

export default App;
