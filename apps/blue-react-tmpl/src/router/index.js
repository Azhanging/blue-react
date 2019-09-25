import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import App from '@/App';
import store from '@store';

//路由路径
import Home from './Home';
import Components from './Components';

function Router() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App>
          {/*路由集合*/}
          <Home/>
          <Components/>
        </App>
      </BrowserRouter>
    </Provider>
  );
}

export default Router;