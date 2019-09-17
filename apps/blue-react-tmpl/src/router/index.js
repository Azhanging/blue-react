import { BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import App from '@/App';

import SuspenseLoading from '$components/SuspenseLoading';
import Home from './Home';
import Components from './Components';

function Router() {
  return (
    <BrowserRouter>
      <App>
        {/*针对lazy加载*/}
        <Suspense fallback={<SuspenseLoading/>}>
          {/*home路由集合*/}
          <Home/>
          {/*组件列表*/}
          <Components/>
        </Suspense>
      </App>
    </BrowserRouter>
  );
}

export default Router;