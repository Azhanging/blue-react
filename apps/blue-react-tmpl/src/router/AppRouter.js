import React from 'react';
import App from '@/App';
import { Router } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import history from "./index";
import store from '@store';
import routes from './routes';
import { BrRoutes, Provider as RouterCacheProvider } from '$components/BrRoutes';
import { routerMeta } from './index';

const $routes = routerMeta.setMeta(routes);

export function AppRouter() {
  return (
    <ReduxProvider store={store}>
      <Router history={history}>
        <RouterCacheProvider history={history}>
          <App>
            <BrRoutes routes={$routes}/>
          </App>
        </RouterCacheProvider>
      </Router>
    </ReduxProvider>
  );
}

export default AppRouter;