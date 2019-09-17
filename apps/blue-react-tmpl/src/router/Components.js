import React from 'react';
import { Route } from 'react-router-dom';

const Index = React.lazy(()=>import('@pages/Components/Index'));

//组件分类路由
function Components() {
  return (
    <>
      <Route exact strict path="/components" component={Index} />
    </>
  );
}

export default Components;