import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { MainContainer } from './styles';
import profileImageDefault from '../../../../assets/profileImageDefault.PNG';
import { api } from '../../../../api';

function Appointment() {
  const { push, goBack } = useHistory();
  const { state } = useLocation();

  const user = JSON.parse(sessionStorage.getItem('userData'));

  const handleGoBack = () => {
    goBack();
  };

  const handleDeleteAppointment = async (id) => {
    await api.delete(`/appointments/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    goBack();
  };

  useEffect(() => {
    if (!state) {
      setTimeout(() => {
        goBack();
      }, 2000);
    }
  }, []);

  const time = 2000;

  return (
    <MainContainer>
      <div id="content">
        {!state ? (
          <h3 style={{ fontSize: '25px' }}>
            Você não possui nenhum agendamento.
          </h3>
        ) : (
          <>
            <div id="barber-image-container">
              <img
                src={state.image_url ? state.image_url : profileImageDefault}
                alt=""
              />
              <h2>{state.name}</h2>
            </div>
            <div id="info-container">
              <span className="info-text">Informações do agendamento: </span>
              <span className="info-text">Endereço: {state.address}</span>
              <span className="info-text">
                Data: {state.day.split('-').reverse().join('/')}
              </span>
              <span className="info-text">
                Horário: {state.start_hour}h -- {state.end_hour}h
              </span>
            </div>
            <div id="button-container">
              <button type="button" onClick={handleGoBack}>
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleDeleteAppointment(state.id);
                }}
              >
                Cancelar agendamento
              </button>
            </div>
          </>
        )}
      </div>
    </MainContainer>
  );
}

export default Appointment;
