import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth';
import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';
import { REGISTER } from '../../../router/consts';

import styles from './LoginForm.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data.errors) {
      const errors = data.errors.map((error) => {
        return {
          field: error.param,
          error: error.msg,
        };
      });
      setErrorMessages(errors);
    }
  };

  const registerOnClickHandler = (e) => {
    e.preventDefault();
    navigate(REGISTER);
  };

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginTitle}>
        <h4>Sign In</h4>
      </div>
      <div className={styles.loginForm}>
        <form onSubmit={loginHandler}>
          <Input name="email" inputContainerClassName={styles.formInput} label="Email Address" type="email" value={email} errorMessage={errorMessages.find((error) => error.field === 'email')} required onChangeHandler={emailOnChangeHandler} />
          <Input name="password" inputContainerClassName={styles.formInput} label="Password" type="password" value={password} errorMessage={errorMessages.find((error) => error.field === 'password')} required onChangeHandler={passwordOnChangeHandler} />
          <div className={styles.buttonContainer}>
            <Button className={styles.buttonSignIn} value="Sign In" />
          </div>
        </form>
      </div>
      <div className={styles.signUpContainer}>
        <i className={styles.signUpText}>Or Sign Up using</i>
        <div className={styles.buttonContainer}>
          <Button className={styles.buttonSignUp} value="Sign Up" onClickHandler={registerOnClickHandler} />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
