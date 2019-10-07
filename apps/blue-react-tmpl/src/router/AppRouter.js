import React from 'react';
import App from '@/App';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import WTabBar from '@components/wap/WTabBar';
import history from "./index";
import store from '@store';
import routes from './routes';
import Routes from '$components/Routes';

export function AppRouter() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App>
          <Routes routes={routes}/>
          {/*导航*/}
          <WTabBar/>
        </App>
      </Router>
    </Provider>
  );
}

export default AppRouter;