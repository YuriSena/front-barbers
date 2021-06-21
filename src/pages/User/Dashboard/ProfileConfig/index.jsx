/* eslint-disable no-restricted-syntax */
import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../../../api';

import { MainContainer } from './styles';
import profileImageDefault from '../../../../assets/profileImageDefault.PNG';

function UserProfileConfig() {
  const history = useHistory();
  const [isWaitingAvatarLoading, setIsWaitingAvatarLoading] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const [inputs, setInputs] = useState({
    email: userData.email,
    phone: userData.phone,
    name: userData.name,
    oldPassword: '',
    password: '',
  });

  const handleUpdate = async () => {
    const data = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      oldPassword: inputs.oldPassword,
      password: inputs.password,
    };
    if (data.password === '' || data.oldPassword === '') {
      delete data.password;
      delete data.oldPassword;
    }
    await api.put(`/clients/${Number(userData.id)}`, data, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    const user = await api.get(`/clients/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    sessionStorage.setItem(
      'userData',
      JSON.stringify({ ...user.data.body, token: userData.token }),
    );
    history.goBack();
  };

  const fileUpload = useCallback(async (e) => {
    setIsWaitingAvatarLoading(true);
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    await api.post('/images', formData, config);
    const user = await api.get(`/clients/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    sessionStorage.setItem(
      'userData',
      JSON.stringify({ ...user.data.body, token: userData.token }),
    );
    setIsWaitingAvatarLoading(false);
  }, []);

  const handleDelete = async () => {
    await api.delete(`/clients/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    sessionStorage.clear();
    history.push('/');
  };

  return (
    <MainContainer>
      <div id="closure">
        <h1>Alterar informações de perfil</h1>
        <div id="content">
          <div id="avatar-container">
            <div id="picture-switch-container">
              <label htmlFor="input-file" />
              <input
                type="file"
                name="image_url"
                value={inputs.image_url}
                id="input-file"
                onChange={fileUpload}
              />
              {isWaitingAvatarLoading ? (
                <span>vinicio muito cocao</span>
              ) : (
                <img
                  src={
                    userData.image_url
                      ? userData.image_url
                      : profileImageDefault
                  }
                  alt="profile-avatar"
                />
              )}
            </div>
            <span>clique acima para carregar uma foto</span>
          </div>
          <form>
            <input
              type="text"
              placeholder="Nome"
              name="name"
              value={inputs.name}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
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

            <input
              type="password"
              placeholder="Senha"
              name="oldPassword"
              value={inputs.oldPassword}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />

            <input
              type="password"
              placeholder="Nova Senha"
              name="password"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
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
              Salvar
            </button>
          </div>
          <button
            id="delete-account-button"
            type="button"
            onClick={handleDelete}
          >
            Excluir minha conta
          </button>
        </div>
      </div>
    </MainContainer>
  );
}

export default UserProfileConfig;
