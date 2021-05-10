import React from 'react';
// import { api } from '../services/sertec.js';

import { MainContainer } from './styles';

import barberIcon from '../../assets/barberIcon1.PNG';
import { colors } from '../../colors';

const ClientRegister = () => (
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
        <h1>Informe seus dados para o cadastro</h1>
        <h3>
          Tipo de Cadastro: <h3 style={{ color: colors.SkyBlue }}>Cliente</h3>
        </h3>
      </div>

      <div id="form-container">
        <label htmlFor="name">
          Nome Completo
          <input placeholder="Nome completo" type="text" id="name" />
        </label>

        <label htmlFor="email">
          Email
          <input placeholder="Email" type="text" id="email" />
        </label>

        <label htmlFor="password">
          Senha
          <input placeholder="Senha" type="password" id="password" />
        </label>

        <label htmlFor="phone">
          Telefone
          <input placeholder="Telefone" type="text" id="phone" />
        </label>
      </div>
    </div>
  </MainContainer>
);
export default ClientRegister;
