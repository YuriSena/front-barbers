import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../../../api';

import { MainContainer } from './styles';

function UserProfileConfig() {
  const history = useHistory();

  // const user = sessionStorage.getItem('user');
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  console.log(userData);

  const [inputs, setInputs] = useState({
    email: '',
    phone: '',
    name: '',
  });

  const handleUpdate = async () => {
    const data = {
      email: inputs.email,
      phone: inputs.phone,
      name: userData.name,
    };
    await api.put(`/clients/${userData.userId}`, data, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
  };

  return (
    <MainContainer>
      <div id="content">
        <h1>Alterar informações de perfil</h1>
        <form>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={(e) => {
              setInputs({ ...inputs, [e.target.name]: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Telefone"
            name="phone"
            value={inputs.phone}
            onChange={(e) => {
              setInputs({ ...inputs, [e.target.name]: e.target.value });
            }}
          />
          {/* <input type="text" placeholder="senha" /> */}
        </form>

        <div id="button-container">
          <button
            type="button"
            onClick={() => {
              history.push('/user-dashboard');
            }}
          >
            Voltar
          </button>

          <button onClick={handleUpdate} type="button">
            Atualizar dados
          </button>
        </div>
      </div>
    </MainContainer>
  );
}

export default UserProfileConfig;
