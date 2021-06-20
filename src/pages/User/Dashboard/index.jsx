import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../../api';

// import { FaArrowCircleDown } from 'react-icons/fa';
import { MainContainer } from './styles';
import profileImageDefault from '../../../assets/profileImageDefault.PNG';

const UserDashboard = () => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [barbersList, setBarbersList] = useState({
    items: [],
    page: 1,
    totalItems: 0,
  });
  const [appointmentList, setAppointmentList] = useState([]);
  const [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem('userData')),
  );

  const user = JSON.parse(sessionStorage.getItem('userData'));

  useEffect(() => {
    setUserInfo(user);
  }, []);

  useEffect(async () => {
    const barbers = await api.get(
      `/providers?perPage=${Number.MAX_SAFE_INTEGER}`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      },
    );
    const {
      data: { body },
    } = await api.get('client-appointments', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setBarbersList({ ...barbers.data.body });
    setAppointmentList(body);
  }, []);

  const handleProfileConfig = () => {
    history.push('/user-dashboard/profile-config');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    history.push('/');
  };

  const handleDeleteAppointment = async (id) => {
    await api.delete(`/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    history.go(0);
  };

  const handleViewAppointment = (appointments) => {
    history.push({
      pathname: '/user-dashboard/appointment',
      state: appointments,
    });
  };

  const handleScheduleAppointment = (barberData) => {
    history.push({
      pathname: '/user-dashboard/schedule-appointment',
      state: barberData,
    });
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
            src={user.image_url ? user.image_url : profileImageDefault}
            alt="profile-default"
          />
          <span id="user-name">{userInfo.name}</span>
          {/* <FaArrowCircleDown id="menu-arrow" /> */}
        </div>

        {open ? (
          <div id="pop-up-container">
            <span id="profile-config" onClick={handleProfileConfig}>
              Editar perfil
            </span>
            <span onClick={handleLogout}>Sair</span>
          </div>
        ) : (
          ''
        )}
      </div>

      <div id="content-container">
        <h1 id="content-title">Lista de barbeiros disponíveis</h1>

        {barbersList.items.map((barber, index) => (
          <div
            id="barber-container"
            onClick={() => handleScheduleAppointment(barber)}
          >
            <img
              id="barber-image"
              src={barber.image_url ? barber.image_url : profileImageDefault}
              alt="barber"
            />
            <div id="barber-info-container">
              <span>{barber.name}</span>
              <span>Endereço: {barber.address}</span>
            </div>
          </div>
        ))}

        <h1 id="content-title2">Agendamentos</h1>

        {appointmentList.length === 0 ? (
          <h3 id="appointment-error-message">
            Você não possui nenhum agendamento.
          </h3>
        ) : (
          appointmentList.map((appointments) => (
            <>
              <span id="appointment-day">
                {appointments.day.split('-').reverse().join('/')}
              </span>
              <div
                id="barber-container"
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewAppointment(appointments);
                }}
              >
                <img
                  id="barber-image"
                  src={
                    appointments.image_url
                      ? appointments.image_url
                      : profileImageDefault
                  }
                  alt="barber"
                />
                <div id="barber-info-container">
                  <span>{appointments.name}</span>

                  <span>
                    Horário: {appointments.start_hour}h --{' '}
                    {appointments.end_hour}h
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAppointment(appointments.id);
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </MainContainer>
  );
};

export default UserDashboard;
