import { BrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Provider, connect } from 'react-redux';
import App from '@/App';
import store from '@store';

import SuspenseLoading from '$components/SuspenseLoading';
import Home from './Home';
import Components from './Components';

function Router() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<App>
					{/*针对lazy加载*/}
					<Suspense fallback={<SuspenseLoading/>}>
						{/*home路由集合*/}
						<Home/>
						{/*组件列表*/}
						<Components/>
					</Suspense>
				</App>
			</BrowserRouter>
		</Provider>

	);
}

export default Router;