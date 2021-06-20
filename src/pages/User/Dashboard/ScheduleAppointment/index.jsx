import React from 'react';

import { MainContainer } from './styles';
import profileImageDefault from '../../../../assets/profileImageDefault.PNG';

function ScheduleAppointment() {
  return (
    <MainContainer>
      <div id="closure">
        <div id="content">
          <div id="barber-image-container">
            <img id="barber-image" src={profileImageDefault} alt="" />
            <h2>Christopher Moura</h2>
          </div>
          <div id="available-services-container">
            <h4>Serviços disponíveis</h4>
            <span>Barba</span>
            <span>Preço: R$ 20,00</span>
          </div>
          <div id="availability-container">
            <h4>Disponibilidade</h4>
            <div id="callendar" />
            <h4 id="available-times-title">
              Horários disponíveis para o dia 26/05/2021
            </h4>
            <div id="time-buttons-container">
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
              <button id="time-button" type="button">
                09:00
              </button>
            </div>
            <button id="scheduling-button" type="button">
              Agendar Horário
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default ScheduleAppointment;
