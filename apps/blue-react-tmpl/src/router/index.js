import { BrowserRouter, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import App from '@/App';

const HomeIndex = React.lazy(() => import('@pages/Home/Index'));

function Router() {
  return (
    <BrowserRouter>
      <App>
        <Suspense fallback={
          <div>loading...</div>
        }>
          <Route path="/" exact component={HomeIndex}/>
        </Suspense>
      </App>
    </BrowserRouter>
  );
}

export default Router;