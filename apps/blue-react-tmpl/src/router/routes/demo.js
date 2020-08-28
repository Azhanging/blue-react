import React from 'react';

const demo = [{
  path: '/index-children',
  component: React.lazy(() => import(`@pages/home/IndexChildren`)),
  meta: {
    title: 'index-children',
    refresh: {
      unforcedList: ["/"]
    },
    afterHook() {
      console.log(`test afterHook`);
    }
  },
  children: [{
    path: 'index-children-children',
    component: React.lazy(() => import(`@pages/home/IndexChildren`))
  }]
}, {
  path: '/index-children-1',
  component: React.lazy(() => import(`@pages/home/IndexChildren`)),
  meta: {
    title: 'index-children-1'
  }
}, {
  path: '/components',
  component: React.lazy(() => import(`@pages/components/Index`)),
  meta: {
    title: 'components',
    tabBar: {
      name: `components`
    }
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


export default demo;