import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../../api';

import { MainContainer } from './styles';

import barberIcon from '../../../assets/barberIcon1.PNG';
import { colors } from '../../../colors';

const ProviderRegister = () => {
  const history = useHistory();
  const [errors, setErrors] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
    services: [false],
  });

  // useEffect(async () => {
  //   const {
  //     data: { body },
  //   } = await api.post('/clients/signin', {
  //     email: 'ccmoura230@inf.ufpel.edu.br',
  //     password: 'teste123',
  //   });
  //   console.log(body);
  // }, []);

  const handleRegister = () => {
    const data = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      password: inputs.password,
      address: inputs.address,
      services: [],
      prices: [],
    };
    if (checked1) {
      data.services.push(1);
      data.prices.push(0);
    }
    if (checked2) {
      data.services.push(2);
      data.prices.push(0);
    }

    console.log(data);

    api
      .post('/providers', data)
      .then(() => {
        history.push('/provider-login');
      })
      .catch((error) => {
        if (error.response.data) {
          setErrors(error.response.data.error);
          history.push('/provider-login');
        }
      });
  };

  // api.get('rota');

  return (
    <MainContainer>
      <div id="logo-container">
        <img id="logo-image" src={barberIcon} alt="barber-icon" />
        {/* <h1 id="logo-title">Barbers</h1> */}
      </div>

      <div id="select-container">
        <div
          id="client-select"
          onClick={() => {
            history.push('/user-register');
          }}
        >
          <span>Cliente</span>
        </div>
        <div id="provider-select">
          <span>Barbeiro</span>
        </div>
      </div>

      <div id="modal-container">
        <div id="modal-title-container">
          <h1>Informe seus dados para o cadastro</h1>
          <h3>
            Tipo de Cadastro:{' '}
            <h3 style={{ color: colors.SkyBlue }}>Barbeiro</h3>
          </h3>
        </div>

        <div id="form-container">
          <label htmlFor="name">
            Nome Completo
            <input
              placeholder="Nome completo"
              type="text"
              id="name"
              name="name"
              value={inputs.name}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              value={inputs.email}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              placeholder="Senha"
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
          </label>

          <label htmlFor="phone">
            Telefone
            <input
              placeholder="Telefone"
              type="text"
              id="phone"
              name="phone"
              value={inputs.phone}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
          </label>

          <label htmlFor="address">
            Endereço Completo
            <input
              placeholder="Endereço"
              type="text"
              id="address"
              name="address"
              value={inputs.address}
              onChange={(e) => {
                setInputs({ ...inputs, [e.target.name]: e.target.value });
              }}
            />
          </label>

          <div id="services-container">
            <label htmlFor="beard">
              Barba
              <input
                type="checkbox"
                id="beard"
                name="beard"
                checked={checked1}
                value={inputs.beard}
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
                value={inputs.haircut}
                onChange={() => {
                  setChecked2(!checked2);
                }}
              />
            </label>
          </div>

          <div id="question-container">
            <span>Já tem conta?</span>
            <span
              onClick={() => {
                history.push('/provider-login');
              }}
              id="link-to-register"
            >
              Faça login aqui.
            </span>
          </div>
        </div>
        <div id="button-container">
          {/* <button
            onClick={() => {
              history.push('/user-register');
            }}
            type="button"
          >
            Mudar para Cliente
          </button> */}
          <button onClick={handleRegister} type="button">
            Cadastrar
          </button>
        </div>
      </div>
    </MainContainer>
  );
};

export default ProviderRegister;
