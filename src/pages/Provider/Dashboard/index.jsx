import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// import { FaArrowCircleDown } from 'react-icons/fa';
import { MainContainer } from './styles';
import profileImageDefault from '../../../assets/profileImageDefault.PNG';

const ProviderDashboard = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleProfileConfig = () => {
    history.push('/provider-dashboard/profile-config');
  };

  return (
    <MainContainer>
      <div id="menu-avatar">
        <div
          id="image-container"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img
            id="profile-image"
            src={profileImageDefault}
            alt="profile-default"
          />
          <span id="provider-name">Nome Completo</span>
          {/* <FaArrowCircleDown id="menu-arrow" /> */}
        </div>

        {open ? (
          <div id="pop-up-container">
            <span id="profile-config" onClick={handleProfileConfig}>
              Editar perfil
            </span>
            <span
              id="profile-quit"
              onClick={() => {
                history.push('/provider-login');
              }}
            >
              Sair
            </span>
          </div>
        ) : (
          ''
        )}
      </div>

      <div id="content-container">
        <h1 id="content-title">Lista de Clientes agendados</h1>
        <div id="barber-container">
          <img id="barber-image" src={profileImageDefault} alt="barber" />
          <div id="barber-info-container">
            <span>Yuri Sena</span>
            <span>13:15, 16/05</span>
          </div>
        </div>

        <div id="barber-container">
          <img id="barber-image" src={profileImageDefault} alt="barber" />
          <div id="barber-info-container">
            <span>Chris Moura</span>
            <span>13:45, 16/05</span>
          </div>
        </div>

        <div id="barber-container">
          <img id="barber-image" src={profileImageDefault} alt="barber" />
          <div id="barber-info-container">
            <span>Rafael Ferreira</span>
            <span>14:00, 17/05</span>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default ProviderDashboard;
