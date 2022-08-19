import React, { useEffect, useState } from 'react';

function Login() {
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

  return (
    <>
      <div>
        <label htmlFor="email-input">
          <input
            id="email-input"
            type="text"
            data-testid="email-input"
            onChange={ handleChangeEmail }
            placeholder="Digite seu email"
            value={ email }
          />
        </label>

        <label htmlFor="password-input">
          <input
            id="password-input"
            type="password"
            data-testid="password-input"
            onChange={ handleChangePassword }
            placeholder="Digite sua senha"
            value={ password }
          />
        </label>
      </div>

      <button disabled={ disabled } type="submit" data-testid="login-submit-btn">
        Enter
      </button>
    </>
  );
}

export default Login;
