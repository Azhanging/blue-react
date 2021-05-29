import React from 'react';
import App from '@/App';
import {Router} from 'react-router';
import {Provider as ReduxProvider} from 'react-redux';
import history from "./index";
import store from '@store';
import routes from './routes';
import {BrRoutes, Provider as BrRoutesProvider} from '$components/BrRoutes';

export function AppRouter () {
	return (
		<ReduxProvider store={store}>
			<BrRoutesProvider history={history}>
				<BrRoutes
					routes={routes}
					render={( routes: any ) => (
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