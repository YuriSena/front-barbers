/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FiSave } from 'react-icons/fi';
import { api } from '../../../../api';

import { MainContainer } from './styles';
import profileImageDefault from '../../../../assets/profileImageDefault.PNG';

function ProviderProfileConfig() {
  const history = useHistory();
  const [available, setAvailable] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [day, setDay] = useState([{ weekday: '', startHour: '', endHour: '' }]);

  const [checked1, setChecked1] = useState(
    !!userData.services.find((e) => e.service === 'Barba'),
  );
  const [checked2, setChecked2] = useState(
    !!userData.services.find((e) => e.service === 'Cabelo'),
  );
  const [beard, setBeard] = useState(
    userData.services[0]?.price ? userData.services[0]?.price : 0,
  );
  const [haircut, setHaircut] = useState(
    userData.services[1]?.price ? userData.services[1]?.price : 0,
  );
  const [isWaitingAvatarLoading, setIsWaitingAvatarLoading] = useState(false);

  const [inputs, setInputs] = useState({
    email: userData.email,
    address: userData.address,
    name: userData.name,
    phone: userData.phone,
    services: userData.services,
    oldPassword: '',
    password: '',
    prices: userData.prices,
  });

  useEffect(async () => {
    const {
      data: {
        body: { availabilities, shifts },
      },
    } = await api.get(`/availabilities/${userData.id}`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    });

    const temp = {
      email: userData.email,
      address: userData.address,
      name: userData.name,
      phone: userData.phone,
      services: [''],
      oldPassword: '',
      password: '',
      prices: [''],
    };

    if (checked1) {
      temp.services.push(1);
      temp.prices.push(userData.services[0].price);
    }

    if (checked2) {
      temp.services.push(2);
      temp.prices.push(userData.services[1].price);
    }

    setInputs(temp);
    setDay(shifts);
  }, []);

  useEffect(() => {
    if (checked1 && !checked2) {
      setInputs({ ...inputs, prices: [beard], services: [1] });
    }
    if (checked2 && !checked1) {
      setInputs({ ...inputs, prices: [haircut], services: [2] });
    }
    if (checked1 && checked2) {
      setInputs({ ...inputs, prices: [beard, haircut], services: [1, 2] });
    }
  }, [beard, haircut, checked1, checked2]);

  const handleUpdate = async () => {
    const data = {
      email: inputs.email,
      address: inputs.address,
      name: inputs.name,
      phone: inputs.phone,
      oldPassword: inputs.oldPassword,
      password: inputs.password,
      services: inputs.services,
      prices: inputs.prices,
    };

    if (data.password === '' || data.oldPassword === '') {
      delete data.password;
      delete data.oldPassword;
    }

    await api.put(`/providers/${userData.id}`, data, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });

    const user = await api.get(`/providers/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    sessionStorage.setItem(
      'userData',
      JSON.stringify({ ...user.data.body, token: userData.token }),
    );
    history.goBack();
  };

  const fileUpload = useCallback(async (e) => {
    setIsWaitingAvatarLoading(true);
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
        'Content-Type': 'multipart/form-data',
      },
    };
    await api.post('/images', formData, config);
    const user = await api.get(`/providers/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    sessionStorage.setItem(
      'userData',
      JSON.stringify({ ...user.data.body, token: userData.token }),
    );
    setIsWaitingAvatarLoading(false);
  }, []);

  const handleDelete = async () => {
    await api.delete(`/providers/${userData.id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    });
    sessionStorage.clear();
    history.push('/');
  };

  const handleAddShift = (weekday) => {
    setAvailable(() => [
      ...available,
      {
        weekday,
        startHour: '',
        endHour: '',
      },
    ]);
  };

  const handleDayChange = (e, index, field) => {
    // 1. Make a shallow copy of the items
    const items = day;
    // 2. Make a shallow copy of the item you want to mutate
    const item = { ...items[index] };
    // 3. Replace the property you're intested in
    item[field] = e.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    setDay(items);
    console.log(day);
  };

  const handleDeleteShifts = (weekday) => {
    available.find((aux) => aux.weekday === weekday);
  };

  return (
    <MainContainer>
      <div id="closure">
        <h1>Alterar informações de perfil</h1>
        <div id="content">
          <div id="avatar-container">
            <div id="picture-switch-container">
              <label htmlFor="input-file" />
              <input
                type="file"
                name="image_url"
                id="input-file"
                onChange={fileUpload}
              />
              {isWaitingAvatarLoading ? (
                <span>carregando imagem...</span>
              ) : (
                <img
                  src={
                    userData?.image_url
                      ? userData?.image_url
                      : profileImageDefault
                  }
                  alt="profile-avatar"
                />
              )}
            </div>
            <span>clique acima para carregar uma foto</span>
          </div>
          <form>
            <input
              type="text"
              placeholder="Nome"
              name="name"
              value={inputs.name}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Telefone"
              name="phone"
              value={inputs.phone}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Endereço"
              name="address"
              value={inputs.address}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Senha Atual"
              name="oldPassword"
              value={inputs.oldPassword}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Nova Senha"
              name="password"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
            <h3>Serviços</h3>
            <div id="services-container">
              <label htmlFor="beard">
                Barba
                <input
                  type="checkbox"
                  id="beard"
                  name="beard"
                  checked={checked1}
                  onChange={() => {
                    setChecked1(!checked1);
                  }}
                />
              </label>

              <label htmlFor="haircut">
                Cabelo
                <input
                  type="checkbox"
                  id="haircut"
                  name="haircut"
                  checked={checked2}
                  onChange={() => {
                    setChecked2(!checked2);
                  }}
                />
              </label>
            </div>
            <h3>Preços</h3>
            <div id="services-price-container">
              <label htmlFor="beard">
                Barba
                <input
                  type="text"
                  id="beard-price"
                  name="beard-price"
                  value={beard}
                  onChange={(e) => {
                    setBeard(e.target.value);
                  }}
                />
              </label>

              <label htmlFor="haircut">
                Cabelo
                <input
                  type="text"
                  id="haircut-price"
                  name="haircut-price"
                  value={haircut}
                  onChange={(e) => {
                    setHaircut(e.target.value);
                  }}
                />
              </label>
            </div>
            <h3>Disponibilidade</h3>
            <div id="shifts-container">
              <div id="checkbox-container">
                <label htmlFor="monday">
                  <input
                    type="checkbox"
                    id="monday-check"
                    name="monday"
                    value={monday}
                    onChange={() => {
                      setMonday(!monday);
                      handleDeleteShifts('monday');
                    }}
                  />
                  <span>Segunda-feira</span>
                </label>

                {monday &&
                  day.map((shift, index) =>
                    shift.weekday === 'monday' ? (
                      <div
                        key={`${shift.weekday}:${shift.startHour}`}
                        id="start-end-container"
                      >
                        <label htmlFor="start">das</label>
                        <input
                          type="text"
                          name="start"
                          // value={shift.startHour}
                          defaultValue={shift.startHour}
                          // value={
                          //   shift.weekday === 'monday' ? shift.startHour : ''
                          // }
                          onChange={(e) =>
                            handleDayChange(e, index, 'startHour')
                          }
                          // onBlur={(e) => setDay({})}
                        />
                        <label htmlFor="end">às</label>
                        <input
                          type="text"
                          name="end"
                          // value={shift.endHour}
                          defaultValue={shift.startHour}
                          onChange={(e) => handleDayChange(e, index, 'endHour')}
                        />
                      </div>
                    ) : (
                      ''
                    ),
                  )}
                {monday && (
                  <div id="button-shift-container">
                    <div
                      id="addShift-container"
                      onClick={() => handleAddShift('monday')}
                    >
                      <IoMdAddCircleOutline size="30" />
                      <span>Adicionar turno</span>
                    </div>

                    <div id="save-shift-container">
                      <FiSave size="30" />
                      <span>Salvar turnos</span>
                    </div>
                  </div>
                )}

                <label htmlFor="tuesday">
                  <input
                    type="checkbox"
                    id="tuesday-check"
                    name="tuesday"
                    value={tuesday}
                    onChange={() => {
                      setTuesday(!tuesday);
                    }}
                  />
                  Terça-feira
                </label>

                {tuesday && (
                  <>
                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>
                  </>
                )}

                <label htmlFor="wednesday">
                  <input
                    type="checkbox"
                    id="wednesday-check"
                    name="wednesday"
                    value={wednesday}
                    onChange={() => {
                      setWednesday(!wednesday);
                    }}
                  />
                  Quarta-feira
                </label>

                {wednesday && (
                  <>
                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>
                  </>
                )}
                <label htmlFor="thursday">
                  <input
                    type="checkbox"
                    id="thursday-check"
                    name="thursday"
                    value={thursday}
                    onChange={() => {
                      setThursday(!thursday);
                    }}
                  />
                  Quinta-feira
                </label>

                {thursday && (
                  <>
                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>
                  </>
                )}
                <label htmlFor="friday">
                  <input
                    type="checkbox"
                    id="friday-check"
                    name="friday"
                    value={friday}
                    onChange={() => {
                      setFriday(!friday);
                    }}
                  />
                  Sexta-feira
                </label>

                {friday && (
                  <>
                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>
                  </>
                )}
                <label htmlFor="saturday">
                  <input
                    type="checkbox"
                    id="saturday-check"
                    name="saturday"
                    value={saturday}
                    onChange={() => {
                      setSaturday(!saturday);
                    }}
                  />
                  Sábado
                </label>

                {saturday && (
                  <>
                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>
                  </>
                )}
                <label htmlFor="sunday">
                  <input
                    type="checkbox"
                    id="sunday-check"
                    name="sunday"
                    value={sunday}
                    onChange={() => {
                      setSunday(!sunday);
                    }}
                  />
                  Domingo
                </label>

                {sunday && (
                  <>
                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>

                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </form>

          <div id="button-container">
            <button
              type="button"
              onClick={() => {
                history.push('/provider-dashboard');
              }}
            >
              Voltar
            </button>

            <button onClick={handleUpdate} type="button">
              Salvar
            </button>
          </div>
          <button
            id="delete-account-button"
            type="button"
            onClick={handleDelete}
          >
            Excluir minha conta
          </button>
        </div>
      </div>
    </MainContainer>
  );
}

export default ProviderProfileConfig;
