import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
  };

  const loginValidate = () => {
    const regexEmail = /\S+@\S+\.\S+/;
    const MIN_PASSWORD = 6;

    if (email.match(regexEmail) && password.length > MIN_PASSWORD) {
      return setDisabled(false);
    }
    return setDisabled(true);
  };

  useEffect(() => {
    loginValidate();
  });

  function submitLogin(event) {
    event.preventDefault();
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

  return (
    <div>
      <form onSubmit={ (event) => submitLogin(event) }>
        <label htmlFor="email-input">
          <input
            id="email-input"
            type="text"
            data-testid="email-input"
            onChange={ handleChangeEmail }
            placeholder="Digite seu email"
            value={ email.email }
          />
        </label>

        <label htmlFor="password-input">
          <input
            id="password-input"
            type="password"
            data-testid="password-input"
            onChange={ handleChangePassword }
            placeholder="Digite sua senha"
            value={ password.password }
          />
        </label>

        <button disabled={ disabled } type="submit" data-testid="login-submit-btn">
          Enter
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({}),
}.isRequired;

export default Login;
