import React, { useState, useEffect } from 'react';
import './calendar.css';
import Calendar from 'react-calendar';

import { useHistory, useLocation } from 'react-router-dom';
import { MainContainer } from './styles';
import profileImageDefault from '../../../../assets/profileImageDefault.PNG';
import { api } from '../../../../api';

function ScheduleAppointment() {
  const { goBack } = useHistory();
  const weekdays = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const [value, onChange] = useState(new Date());
  const [startHour, setStartHour] = useState('');
  const [availabilities, setAvailabilities] = useState({});
  const [scheduled, setScheduled] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const { state } = useLocation();

  useEffect(async () => {
    const {
      data: { body },
    } = await api.get(`/availabilities/${state.id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });

    setAvailabilities(body.availabilities);
    setScheduled(body.scheduled);
  }, []);

  const handleCreateAppointment = async () => {
    let endHour = startHour.split(':')[0];
    let endMinute = startHour.split(':')[1];

    const minute = Number(endMinute) + 30;
    if (minute >= 60) {
      endHour = `${Number(endHour) + 1 >= 24 ? '00' : Number(endHour) + 1}`;
      endHour = `${Number(endHour) < 10 ? `0${endHour}` : endHour}`;
      endMinute = 60 - minute < 10 ? `0${60 - minute}` : 60 - minute;
    } else {
      endMinute = minute;
    }

    await api.post(
      '/appointments',
      {
        day: `${value.getFullYear()}-${
          value.getMonth() + 1 < 10
            ? `0${value.getMonth() + 1}`
            : value.getMonth() + 1
        }-${value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()}`,
        providerId: state.id,
        startHour,
        endHour: `${endHour}:${endMinute}`,
      },
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      },
    );

    goBack();
  };

  return (
    <MainContainer>
      <div id="closure">
        <div id="content">
          <div id="barber-image-container">
            <img
              id="barber-image"
              src={state.image_url ? state.image_url : profileImageDefault}
              alt=""
            />
            <h2>{state.name}</h2>
          </div>
          <div id="available-services-container">
            <h4>Serviços disponíveis</h4>
            {state.services.map((service) => (
              <>
                <span>{service.service}</span>
                <span>Preço: R$ {service.price}</span>
              </>
            ))}
          </div>
          <div id="availability-container">
            <h4>Disponibilidade</h4>
            <div id="calendar">
              <Calendar
                calendarType="Arabic"
                onChange={onChange}
                value={value}
                tileDisabled={({ date }) =>
                  !(weekdays[date.getDay()] in availabilities) ||
                  date < new Date(new Date().valueOf() - 1000 * 60 * 60 * 24)
                }
              />
            </div>
            <h4 id="available-times-title">
              Horários disponíveis para o dia{' '}
              {`${
                value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
              }/${
                value.getMonth() + 1 < 10
                  ? `0${value.getMonth() + 1}`
                  : value.getMonth() + 1
              }/${value.getFullYear()}`}
            </h4>
            <div id="time-buttons-container">
              {Object.keys(availabilities).length > 0 &&
                weekdays[value.getDay()] in availabilities &&
                availabilities[
                  Object.keys(availabilities).find(
                    (weekday) => weekday === weekdays[value.getDay()],
                  )
                ].map(
                  (availability) =>
                    !scheduled.find(
                      (s) =>
                        s.startHour === availability &&
                        s.day ===
                          `${value.getFullYear()}-${
                            value.getMonth() + 1 < 10
                              ? `0${value.getMonth() + 1}`
                              : value.getMonth() + 1
                          }-${
                            value.getDate() < 10
                              ? `0${value.getDate()}`
                              : value.getDate()
                          }`,
                    ) && (
                      <button
                        id="time-button"
                        type="button"
                        onClick={() => setStartHour(availability)}
                      >
                        {availability}
                      </button>
                    ),
                )}
            </div>
            <button
              id="scheduling-button"
              type="button"
              onClick={handleCreateAppointment}
            >
              Agendar Horário
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export default ScheduleAppointment;
