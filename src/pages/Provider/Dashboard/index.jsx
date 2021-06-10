import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// import { FaArrowCircleDown } from 'react-icons/fa';
import { useEffect } from 'react/cjs/react.development';
import { MainContainer } from './styles';
import profileImageDefault from '../../../assets/profileImageDefault.PNG';
import { api } from '../../../api';

const ProviderDashboard = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  // const [userInfo, setUserInfo] = useState(
  //   JSON.parse(sessionStorage.getItem('userData')),
  // );
  const [appointmentsList, setAppointmentsList] = useState();
  const user = JSON.parse(sessionStorage.getItem('userData'));
  console.log(user);

  useEffect(async () => {
    const appointments = await api.get('/appointments', {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setAppointmentsList(appointments.data.body.items);
  }, []);

  const handleProfileConfig = () => {
    history.push('/provider-dashboard/profile-config');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    history.push('/provider-login');
  };

  console.log(appointmentsList);

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
                handleLogout();
              }}
            >
              Sair
            </span>
          </div>
        ) : (
          ''
        )}
      </div>

      <div id="closure">
        <h1 id="content-title">Lista de Clientes agendados</h1>

        <div id="content-container">
          {appointmentsList.map((appoint) => (
            <div id="barber-container">
              <img id="barber-image" src={profileImageDefault} alt="barber" />
              <div id="barber-info-container">
                <span id="info-name">
                  <b>Nome:</b> {appoint.clientName}
                </span>
                <span>
                  <b>Horário:</b> {appoint.start_hour} -- {appoint.end_hour}
                </span>
                <span>
                  <b>Data:</b> {appoint.day}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default ProviderDashboard;
