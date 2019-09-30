import React from 'react';

const Index = React.lazy(() => import(`@pages/home/Index`));
const IndexChildren = React.lazy(() => import(`@pages/home/IndexChildren`));
const Components = React.lazy(() => import(`@pages/components/Index`));

//总的路由线
const routes = [{
	path: '/',
	component: Index,
	children: [{
		path: 'index-children',
		component: IndexChildren,
	}, {
		path: 'index-children/index-children-children',
		component: IndexChildren
	}]
}, {
	path: '/components',
	component: Components,
}];

export default routes;