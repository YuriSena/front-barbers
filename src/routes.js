import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import ProviderLogin from './pages/ProviderLogin';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ProviderLogin} />
        <Route exact path="/" component={UserLogin} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
