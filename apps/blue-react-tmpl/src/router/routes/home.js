import React from 'react';

const home = [{
  path: '/',
  exact: true,
  stack: true,
  component: React.lazy(() => import(`@pages/home/Index`)),
  meta: {
    tabBar: {
      name: `home`
    }
  }
}, {
  path: '/register',
  component: React.lazy(() => import(`@pages/home/Register`))
}];

export default home;