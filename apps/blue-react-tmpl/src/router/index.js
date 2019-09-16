import { BrowserRouter, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import App from '@/App';

import SuspenseLoading from '$components/SuspenseLoading';
const HomeIndex = React.lazy(() => import('@pages/Home/Index'));

function Router() {
  return (
    <BrowserRouter>
      <App>
        <Suspense fallback={<SuspenseLoading />}>
          <Route path="/" exact component={HomeIndex}/>
        </Suspense>
      </App>
    </BrowserRouter>
  );
}

export default Router;