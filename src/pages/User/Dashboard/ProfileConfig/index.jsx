import React from 'react';
import { useHistory } from 'react-router-dom';

import { MainContainer } from './styles';

function UserProfileConfig() {
  const history = useHistory();
  return (
    <MainContainer>
      <div id="content">
        <h1>Alterar informações de perfil</h1>
        <form>
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Endereço" />
          {/* <input type="text" placeholder="senha" /> */}
        </form>
        <button
          type="button"
          onClick={() => {
            history.push('/user-dashboard');
          }}
        >
          Voltar
        </button>
      </div>
    </MainContainer>
  );
}

export default UserProfileConfig;
