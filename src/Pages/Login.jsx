import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  const loginValidate = () => {
    const filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const minCharacters = 6;
    return !(filter.test(email) && password.length > minCharacters);
  };

  function submitLogin(event) {
    event.preventDefault();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

  return (
    <div className="login-container">
      <h1>Receitas da Vovó Moderna</h1>
      <form onSubmit={ (event) => submitLogin(event) }>
        <label htmlFor="email-input">
          <input
            className="email-input"
            type="text"
            data-testid="email-input"
            onChange={ handleChangeEmail }
            placeholder="Digite seu email"
            value={ email.email }
          />
        </label>

        <label htmlFor="password-input">
          <input
            className="password-input"
            type="password"
            data-testid="password-input"
            onChange={ handleChangePassword }
            placeholder="Digite sua senha"
            value={ password.password }
          />
        </label>
        <div className="login-button">
          <button disabled={ disabled } type="submit" data-testid="login-submit-btn">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: shape({
    push: func,
  }),
}.isRequired;

export default Login;
