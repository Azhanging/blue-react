import React from 'react';
import { Route } from 'react-router-dom';

const HomeIndex = React.lazy(() => import('@pages/Home/Index'));

//首页分类路由
function Home() {
  console.log(require('react-router-dom'));
  return (
    <>
      <Route exact strict path="/" component={HomeIndex}/>
    </>
  );
}

export default Home;