import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

export function genRoutes(routes) {
  const _routes = [];
  routes.forEach((CurrentRoute, index) => {
    let routes = [];
    const childrenRoute = CurrentRoute.children;
    if (childrenRoute && childrenRoute.length > 0) {
      routes = genRoutes(childrenRoute);
    }
    _routes.push((
      <Route exact={CurrentRoute.exact}
             strict={CurrentRoute.strict}
             path={CurrentRoute.path}
             key={`route-key-${index}`}>
        <CurrentRoute.component routes={routes}/>
      </Route>
    ));
  });
  return (
    <Switch>
      {_routes}
    </Switch>
  );
}

function Routes(props) {
  const [routes] = useState(genRoutes(props.routes));
  return (
    <>
      {routes}
    </>
  );
}

export default Routes;