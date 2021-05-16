import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserRegister from './pages/User/Register';
import ProviderRegister from './pages/Provider/Register';
import UserLogin from './pages/User/Login';
import ProviderLogin from './pages/Provider/Login';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserRegister} />
        {/* rota padrao, cadastro do cliente */}
        <Route exact path="/provider-register" component={ProviderRegister} />
        {/* rota de cadastro do barbeiro */}
        <Route exact path="/user-login" component={UserLogin} />
        {/* rota de login do cliente */}
        <Route exact path="/provider-login" component={ProviderLogin} />
        {/* rota de login do barbeiro */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
