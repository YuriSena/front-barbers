import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserRegister from './pages/User/Register';
import ProviderRegister from './pages/Provider/Register';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserRegister} />
        {/* rota padrao, cadastro do cliente */}
        <Route exact path="/provider-register" component={ProviderRegister} />
        {/* rota de cadastro do barbeiro */}
        <Route exact path="/user-login" component={UserRegister} />
        {/* rota de login do cliente */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
