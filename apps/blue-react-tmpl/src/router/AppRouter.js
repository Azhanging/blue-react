import React from 'react';
import App from '@/App';
import { Router } from 'react-router';
import { Provider as ReduxProvider } from 'react-redux';
import history from "./index";
import store from '@store';
import routes from './routes';
import BrRoutes from '$components/BrRoutes';
import { routerMeta } from './index';

const $routes = routerMeta.setMeta(routes);

export function AppRouter() {
  return (
    <ReduxProvider store={store}>
      <Router history={history}>
        <App>
          <BrRoutes history={history} routes={$routes}/>
        </App>
      </Router>
    </ReduxProvider>
  );
}

export default AppRouter;