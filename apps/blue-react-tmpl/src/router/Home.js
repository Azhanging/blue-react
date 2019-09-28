import React from 'react';
import { Route } from 'react-router-dom';

const Index = React.lazy(() => import('@pages/Home/Index'));

//首页分类路由
function Home() {
  return (
    <>
      <Route exact strict path="/" component={Index}/>
    </>
  );
}

export default Home;