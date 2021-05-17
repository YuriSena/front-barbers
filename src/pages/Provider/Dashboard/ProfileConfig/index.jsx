import React from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../../../api';

import { MainContainer } from './styles';

function ProviderProfileConfig() {
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
            history.push('/provider-dashboard');
          }}
        >
          Deletar Conta
        </button>
        <button
          type="button"
          onClick={() => {
            history.push('/provider-dashboard');
          }}
        >
          Voltar
        </button>
      </div>
    </MainContainer>
  );
}

export default ProviderProfileConfig;
