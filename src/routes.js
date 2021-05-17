import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserRegister from './pages/User/Register';
import ProviderRegister from './pages/Provider/Register';
import UserLogin from './pages/User/Login';
import ProviderLogin from './pages/Provider/Login';
import UserDashboard from './pages/User/Dashboard';
import UserProfileConfig from './pages/User/Dashboard/ProfileConfig';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserLogin} />
        {/* rota padrao, cadastro do cliente */}
        <Route exact path="/provider-register" component={ProviderRegister} />
        {/* rota de cadastro do barbeiro */}
        <Route exact path="/user-register" component={UserRegister} />
        {/* rota de login do cliente */}
        <Route exact path="/provider-login" component={ProviderLogin} />
        {/* rota de login do barbeiro */}
        <Route exact path="/user-dashboard" component={UserDashboard} />
        {/* rota para dashboard do usuario */}
        <Route exact path="/provider-dashboard" component={UserDashboard} />
        {/* rota para dashboard do barbeiro */}
        <Route
          exact
          path="/user-dashboard/profile-config"
          component={UserProfileConfig}
        />
        {/* rota para dashboard do usuario */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
