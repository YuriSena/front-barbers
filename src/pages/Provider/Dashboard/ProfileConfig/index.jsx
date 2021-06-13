import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../../../api';

import { MainContainer } from './styles';
import profileImageDefault from '../../../../assets/profileImageDefault.PNG';

function ProviderProfileConfig() {
  const history = useHistory();

  const userData = JSON.parse(sessionStorage.getItem('userData'));
  console.log(userData);

  const [inputs, setInputs] = useState({
    email: '',
    address: '',
    name: '',
    image_url: '',
  });

  const handleUpdate = async () => {
    const data = {
      email: inputs.email,
      address: inputs.phone,
      name: userData.name,
    };
    await api.put(`/providers/${userData.userId}`, data, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
  };

  const handleUpdateImage = () => {
    const data = {
      image_url: inputs.image_url,
    };
    console.log(data);
  };

  return (
    <MainContainer>
      <div id="content">
        <h1>Alterar informações de perfil</h1>

        <div id="avatar-container">
          <div id="picture-switch-container">
            <label htmlFor="input-file" />
            <input
              type="file"
              name="image_url"
              value={inputs.image_url}
              id="input-file"
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
              onClick={handleUpdateImage}
            />
            <img
              src={
                userData.image_url ? userData.image_url : profileImageDefault
              }
              alt="profile-avatar"
              // onClick={handleUpdateImage}
            />
          </div>
          <span>clique acima para carregar uma foto</span>
        </div>
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
            placeholder="Endereço"
            name="phone"
            value={inputs.phone}
            onChange={(e) => {
              setInputs({ ...inputs, [e.target.name]: e.target.value });
            }}
          />
          {/* <input type="text" placeholder="senha" /> */}
        </form>
        <button
          type="button"
          onClick={() => {
            handleUpdate();
          }}
        >
          Atualizar
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
