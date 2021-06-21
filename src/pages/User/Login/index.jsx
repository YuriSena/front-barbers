import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { MainContainer } from './styles';
import barberIcon from '../../../assets/barberIcon1.PNG';
import { colors } from '../../../colors';
import { api } from '../../../api';

const UserLogin = () => {
  const history = useHistory();
  const [errors, setErrors] = useState('');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const schema = yup.object().shape({
    email: yup
      .string()
      .required('Todos os campos são obrigatórios')
      .email('Formato de email invalido'),

    password: yup
      .string()
      .required('Todos os campos são obrigatórios')
      .min(
        8,
        'A senha deve ter no mínimo 8 caracteres, e conter números e letras',
      ),
  });

  const handleLogin = async () => {
    const data = {
      email: inputs.email,
      password: inputs.password,
    };

    try {
      await schema.validate(data);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.map((err) => setErrors(err));
      }
      return false;
    }

    try {
      await api.post('/clients/signin', data).then((response) => {
        sessionStorage.setItem(
          'userData',
          JSON.stringify({ ...response.data.body, ...data }),
        );
      });
    } catch (error) {
      setErrors('Usuário inválido');
      return false;
    }

    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const user = await api.get(`/clients/${userData.userId}`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    });

    sessionStorage.setItem(
      'userData',
      JSON.stringify({
        ...userData,
        ...user.data.body,
      }),
    );
    history.push('/user-dashboard');
    return true;
  };

  return (
    <MainContainer>
      <div id="logo-container">
        <img id="logo-image" src={barberIcon} alt="barber-icon" />
      </div>

      <div id="select-container">
        <div id="client-select">
          <span>Cliente</span>
        </div>
        <div
          id="provider-select"
          onClick={() => {
            history.push('/provider-login');
          }}
        >
          <span>Barbeiro</span>
        </div>
      </div>

      <div id="modal-container">
        <div id="modal-title-container">
          <h1>Informe seus dados para o login</h1>
          <h3>
            Tipo de Login: <h3 style={{ color: colors.SkyBlue }}>Cliente</h3>
          </h3>
          {errors ? (
            <p style={{ color: 'red', margin: '.3em 0' }}>{errors}</p>
          ) : (
            ''
          )}
        </div>

        <div id="form-container">
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

          <div id="question-container">
            <span>Não tem conta?</span>
            <span
              onClick={() => {
                history.push('/user-register');
              }}
              id="link-to-register"
            >
              Cadastre-se aqui.
            </span>
          </div>
        </div>

        <div id="button-container">
          <button onClick={handleLogin} type="button">
            Fazer login
          </button>
        </div>
      </div>
    </MainContainer>
  );
};
export default UserLogin;
