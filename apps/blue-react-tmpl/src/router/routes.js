import React from 'react';

const Index = React.lazy(() => import(`@pages/home/Index`));
const IndexChildren = React.lazy(() => import(`@pages/home/IndexChildren`));
const Components = React.lazy(() => import(`@pages/components/Index`));

//总的路由线
const routes = [{
  path: '/',
  exact: true,
  stack: true,
  component: Index,
  meta: {
    id: 1
  }
}, {
  path: '/index-children',
  component: IndexChildren,
  children: [{
    path: '/index-children-children',
    component: IndexChildren
  }]
}, {
  path: '/components',
  component: Components,
  children: [{
    path: 'child',
    component: Components
  }]
}, {
  path: '/components/:id/:uid',
  component: Components
}];

export default routes;