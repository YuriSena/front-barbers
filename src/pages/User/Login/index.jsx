import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import { MainContainer } from './styles';

import barberIcon from '../../../assets/barberIcon1.PNG';
import { colors } from '../../../colors';
import { api } from '../../../api';

const UserLogin = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    const data = {
      email: inputs.email,
      password: inputs.password,
    };

    await api.post('/clients/signin', data).then((response) => {
      sessionStorage.setItem(
        'userData',
        JSON.stringify({ ...response.data.body, ...data }),
      );
    });

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const user = await api.get(`/clients/${userData.userId}`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    });

    sessionStorage.setItem(
      'userData',
      JSON.stringify({
        ...userData,
        ...user.data.body,
      }),
    );
    history.push('/user-dashboard');
  };

  return (
    <MainContainer>
      <div id="logo-container">
        <img id="logo-image" src={barberIcon} alt="barber-icon" />
        {/* <h1 id="logo-title">Barbers</h1> */}
      </div>

      <div id="select-container">
        <div id="client-select">
          <span>Cliente</span>
        </div>
        <div
          id="provider-select"
          onClick={() => {
            history.push('/provider-login');
          }}
        >
          <span>Barbeiro</span>
        </div>
      </div>

      <div id="modal-container">
        <div id="modal-title-container">
          <h1>Informe seus dados para o login</h1>
          <h3>
            Tipo de Login: <h3 style={{ color: colors.SkyBlue }}>Cliente</h3>
          </h3>
        </div>

        <div id="form-container">
          <label htmlFor="email">
            Email
            <input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              placeholder="Senha"
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
          </label>

          <div id="question-container">
            <span>Não tem conta?</span>
            <span
              onClick={() => {
                history.push('/user-register');
              }}
              id="link-to-register"
            >
              Cadastre-se aqui.
            </span>
          </div>
        </div>

        <div id="button-container">
          {/* <button
            onClick={() => {
              history.push('/provider-login');
            }}
            type="button"
          >
            Mudar para Barbeiro
          </button> */}
          <button onClick={handleLogin} type="button">
            Fazer login
          </button>
        </div>
      </div>
    </MainContainer>
  );
};
export default UserLogin;
