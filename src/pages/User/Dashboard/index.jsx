import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../../api';

// import { FaArrowCircleDown } from 'react-icons/fa';
import { MainContainer } from './styles';
import profileImageDefault from '../../../assets/profileImageDefault.PNG';

const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [barbersList, setBarbersList] = useState({});

  const user = JSON.parse(sessionStorage.getItem('userData'));
  console.log(user);

  useEffect(async () => {
    console.log(user);
    const barbers = await api.get('/providers', {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setBarbersList(barbers.data.body);
    console.log(barbersList);
  }, []);

  // useEffect(async () => {
  //   const userData = JSON.parse(sessionStorage.getItem('userData'));
  //   const user = await api
  //     .get(`/clients/${userData.userId}`, {
  //       headers: { Authorization: `Bearer ${userData.token}` },
  //     })
  //     .then((response) => {
  //       sessionStorage.setItem(
  //         'userData',
  //         JSON.stringify({ ...response.data.body, ...user }),
  //       );
  //     });
  //   console.log(userData);
  // }, []);

  // const handleProfile = async () => {
  //   const userData = JSON.parse(sessionStorage.getItem('userData'));
  //   console.log(userData);
  //   const user = await api
  //     .get(`/clients/${userData.userId}`, {
  //       headers: { Authorization: `Bearer ${userData.token}` },
  //     })
  //     .then((response) => {
  //       sessionStorage.setItem(
  //         'userData',
  //         JSON.stringify({
  //           name: user.data.body.name,
  //           phone: user.data.body.phone,
  //         }),
  //       );
  //     });

  //   console.log(user.data.body.phone);
  // };
  // handleProfile();

  // sessionStorage.setItem('userData', {...user});

  const handleProfileConfig = () => {
    history.push('/user-dashboard/profile-config');
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
          <span id="user-name">Nome Completo</span>
          {/* <FaArrowCircleDown id="menu-arrow" /> */}
        </div>

        {open ? (
          <div id="pop-up-container">
            <span id="profile-config" onClick={handleProfileConfig}>
              Editar perfil
            </span>
            <span>Sair</span>
          </div>
        ) : (
          ''
        )}
      </div>

      <div id="content-container">
        <h1 id="content-title">Lista de barbeiros disponíveis</h1>

        {barbersList.items.map((barber, index) => (
          <div id="barber-container">
            <img
              id="barber-image"
              src={barber.image_url ? barber.image_url : profileImageDefault}
              alt="barber"
            />
            <div id="barber-info-container">
              <span>{barber.name}</span>
              <span>{barber.address}</span>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
};

export default UserDashboard;
