import React from 'react';
import App from '@/App';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import history from "./index";
import store from '@store';
import routes from './routes';
import Routes from '$components/Routes';
import { routerMeta } from './index';

const $routes = routerMeta.setMeta(routes);

export function AppRouter() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Routes routes={$routes}/>
        </App>
      </Router>
    </Provider>
  );
}

export default AppRouter;