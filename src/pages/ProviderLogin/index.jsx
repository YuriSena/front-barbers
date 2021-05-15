import React from 'react';
// import { api } from '../services/sertec.js';

import { MainContainer } from './styles';

import barberIcon from '../../assets/barberIcon1.PNG';
import { colors } from '../../colors';

const PrestadorLogin = () => (
  // api.post('/users', {
  //   name: 'fulano',
  //   age: 15,
  // });

  // api.get('rota');

  <MainContainer>
    <div id="logo-container">
      <img id="logo-image" src={barberIcon} alt="barber-icon" />
      {/* <h1 id="logo-title">Barbers</h1> */}
    </div>

    <div id="modal-container">
      <div id="modal-title-container">
        <h1>Informe seus dados para o login</h1>
        <h3>
          Tipo de Login: <h3 style={{ color: colors.SkyBlue }}>Prestador</h3>
        </h3>
      </div>

      <div id="form-container">
        <label htmlFor="email">
          Email
          <input placeholder="Email" type="text" id="email" />
        </label>

        <label htmlFor="password">
          Senha
          <input placeholder="Senha" type="password" id="password" />
        </label>
      </div>
    </div>
  </MainContainer>
);
export default PrestadorLogin;
