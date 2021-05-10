import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ClientRegister from './pages/ClientRegister';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ClientRegister} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
