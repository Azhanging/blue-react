import React, { useEffect } from 'react';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import App from '@/App';
import store from '@store';

//路由路径
import Home from './Home';
import Components from './Components';

//绑定路由的实例，方便外部使用
const history = createBrowserHistory();

history.listen((location, action) => {

});

export function AppRouter() {
	return (
		<Provider store={store}>
			<Router history={history}>
				<App>
					{/*路由集合*/}
					<Home/>
					<Components/>
				</App>
			</Router>
		</Provider>
	);
}

export default history;