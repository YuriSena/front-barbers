import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// import DateFnsUtils from '@date-io/date-fns'; // choose your lib
// import {
//   DatePicker,
//   TimePicker,
//   DateTimePicker,
//   MuiPickersUtilsProvider,
// } from '@material-ui/pickers';
import { set } from 'date-fns/esm';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { api } from '../../../../api';

import { MainContainer } from './styles';
import profileImageDefault from '../../../../assets/profileImageDefault.PNG';

function ProviderProfileConfig() {
  const history = useHistory();
  const [available, setAvailable] = useState([]);

  const userData = JSON.parse(sessionStorage.getItem('userData'));
  // console.log(userData);

  const [checked1, setChecked1] = useState(
    !!userData.services.find((e) => e.service === 'Barba'),
  );
  const [checked2, setChecked2] = useState(
    !!userData.services.find((e) => e.service === 'Cabelo'),
  );
  const [beard, setBeard] = useState(0);
  const [haircut, setHaircut] = useState(0);
  const [selectedDate, handleDateChange] = useState(new Date());

  const [inputs, setInputs] = useState({
    email: '',
    address: '',
    name: '',
    phone: '',
    services: [''],
    oldPassword: '',
    password: '',
    prices: [''],
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
    setAvailable(availabilities);
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

  const handleUpdate = () => {
    console.log(inputs);
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

    console.log(data);

    // await api.put(`/providers/${userData.userId}`, data, {
    //   headers: {
    //     Authorization: `Bearer ${userData.token}`,
    //   },
    // });
  };

  // const addShift = (e, weekday) => {
  //   e.preventDefault();

  //   setAvailable({ ...available, [weekday]: [...available[weekday], ''] });
  //   console.log(available);
  // };

  const handleUpdateImage = () => {
    const data = {
      image_url: inputs.image_url,
    };
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
                value={inputs.image_url}
                id="input-file"
                onChange={(e) => {
                  setInputs({ ...inputs, [e.target.name]: e.target.value });
                }}
                onClick={handleUpdateImage}
              />
              <img
                src={
                  userData.image_url ? userData.image_url : profileImageDefault
                }
                alt="profile-avatar"
                // onClick={handleUpdateImage}
              />
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
            {available ? (
              <div id="shifts-container">
                <div id="checkbox-container">
                  <label htmlFor="monday">
                    <input
                      type="checkbox"
                      id="monday-check"
                      name="monday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    <span>Segunda-feira</span>
                  </label>
                  {Object.keys(available).map((weekday, index) => (
                    <div id="start-end-container">
                      <label htmlFor="start">das</label>
                      <input type="text" name="start" />
                      <label htmlFor="end">às</label>
                      <input type="text" name="end" />
                    </div>
                  ))}
                  {/* <div
                    id="addShift-container"
                    onClick={(e) => {
                      addShift(e, 'monday');
                    }}
                  >
                    <IoMdAddCircleOutline size="30" color="#B2ACFA" />
                    <span>Adicionar novo turno</span>
                  </div> */}

                  <label htmlFor="tuesday">
                    <input
                      type="checkbox"
                      id="tuesday-check"
                      name="tuesday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Terça-feira
                  </label>
                  <label htmlFor="wednesday">
                    <input
                      type="checkbox"
                      id="wednesday-check"
                      name="wednesday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Quarta-feira
                  </label>
                  <label htmlFor="thursday">
                    <input
                      type="checkbox"
                      id="thursday-check"
                      name="thursday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Quinta-feira
                  </label>
                  <label htmlFor="friday">
                    <input
                      type="checkbox"
                      id="friday-check"
                      name="friday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Sexta-feira
                  </label>
                  <label htmlFor="saturday">
                    <input
                      type="checkbox"
                      id="saturday-check"
                      name="saturday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Sábado
                  </label>
                  <label htmlFor="sunday">
                    <input
                      type="checkbox"
                      id="sunday-check"
                      name="sunday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Domingo
                  </label>
                </div>
              </div>
            ) : (
              <div id="shifts-container">
                <div id="checkbox-container">
                  <label htmlFor="monday">
                    <input
                      type="checkbox"
                      id="monday-check"
                      name="monday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    <span>Segunda-feira</span>
                  </label>
                  {true}
                  <div id="start-end-container">
                    <label htmlFor="start">das</label>
                    <input type="text" name="start" />
                    <label htmlFor="end">às</label>
                    <input type="text" name="end" />
                  </div>

                  <label htmlFor="tuesday">
                    <input
                      type="checkbox"
                      id="tuesday-check"
                      name="tuesday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Terça-feira
                  </label>
                  <label htmlFor="wednesday">
                    <input
                      type="checkbox"
                      id="wednesday-check"
                      name="wednesday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Quarta-feira
                  </label>
                  <label htmlFor="thursday">
                    <input
                      type="checkbox"
                      id="thursday-check"
                      name="thursday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Quinta-feira
                  </label>
                  <label htmlFor="friday">
                    <input
                      type="checkbox"
                      id="friday-check"
                      name="friday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Sexta-feira
                  </label>
                  <label htmlFor="saturday">
                    <input
                      type="checkbox"
                      id="saturday-check"
                      name="saturday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Sábado
                  </label>
                  <label htmlFor="sunday">
                    <input
                      type="checkbox"
                      id="sunday-check"
                      name="sunday"
                      // checked={checked2}
                      // value={inputs.haircut}
                      // onChange={() => {
                      //   setChecked2(!checked2);
                      // }}
                    />
                    Domingo
                  </label>
                </div>
              </div>
            )}
          </form>

          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker value={selectedDate} onChange={handleDateChange} />
          <TimePicker value={selectedDate} onChange={handleDateChange} />
          <DateTimePicker value={selectedDate} onChange={handleDateChange} />
        </MuiPickersUtilsProvider> */}

          <button
            type="button"
            onClick={() => {
              handleUpdate();
            }}
          >
            Atualizar
          </button>
          <button
            type="button"
            onClick={() => {
              history.push('/provider-dashboard');
            }}
          >
            Voltar
          </button>
        </div>
      </div>
    </MainContainer>
  );
}

export default ProviderProfileConfig;
