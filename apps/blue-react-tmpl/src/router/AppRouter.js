import React from 'react';
import App from '@/App';
import { Router } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import history from "./index";
import store from '@store';
import routes from './routes';
import { BrRouter, Provider as BrRouterProvider } from '$components/BrRoutes';
import { routerMeta } from './index';
//路由后处理
import routerAfter from '$use-in-react-router/router-after';
import routerBefore from '$use-in-react-router/router-before';

const $routes = routerMeta.setMeta(routes);

export function AppRouter() {
  return (
    <ReduxProvider store={store}>
      <BrRouterProvider history={history}>
        <BrRouter
          routerBefore={routerBefore}
          routes={$routes}
          routerAfter={routerAfter}
          render={(routes) => (
            <Router history={history}>
              <App>
                {routes}
              </App>
            </Router>
          )}/>
      </BrRouterProvider>
    </ReduxProvider>
  );
}

export default AppRouter;