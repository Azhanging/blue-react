import React from 'react';

//总的路由线
const routes = [{
  path: '/',
  exact: true,
  stack: true,
  component: React.lazy(() => import(`@pages/home/Index`)),
  meta: {
    tabBar: ''
  }
}, {
  path: '/index-children',
  component: React.lazy(() => import(`@pages/home/IndexChildren`)),
  meta: {
    title: 'index-children'
  },
  children: [{
    path: '/index-children-children',
    component: React.lazy(() => import(`@pages/home/IndexChildren`))
  }]
}, {
  path: '/components',
  component: React.lazy(() => import(`@pages/components/Index`)),
  meta: {
    title: 'components'
  },
  children: [{
    path: 'child',
    component: React.lazy(() => import(`@pages/components/Index`))
  }]
}, {
  path: '/components/:id/:uid',
  component: React.lazy(() => import(`@pages/components/Index`))
}, {
  path: '/formik',
  component: React.lazy(() => import(`@pages/home/Formik`))
}];

export default routes;