import React from 'react';
import App from '@/App';
import { Router } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import history from "./index";
import store from '@store';
import routes from './routes/index';
import { BrRoutes, Provider as BrRoutesProvider } from '$components/BrRoutes';
//路由后处理
import routerAfter from '$use-in-react-router/router-after';
import routerBefore from '$use-in-react-router/router-before';

export function AppRouter() {
  return (
    <ReduxProvider store={store}>
      <BrRoutesProvider history={history}>
        <BrRoutes
          routerBefore={routerBefore}
          routerAfter={routerAfter}
          routes={routes}
          render={(routes) => (
            <Router history={history}>
              <App>
                {routes}
              </App>
            </Router>
          )}/>
      </BrRoutesProvider>
    </ReduxProvider>
  );
}

export default AppRouter;