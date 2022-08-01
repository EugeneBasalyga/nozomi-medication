import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth';
import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';
import { REGISTER } from '../../../router/consts';

import styles from './LoginForm.css';

const LoginForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginHandler = async (e) => {
    e.preventDefault();
    const errorMessage = await login(emailAddress, password);
    if (errorMessage.error) {
      setErrorMessage(errorMessage);
    }
  };

  const registerOnClickHandler = (e) => {
    e.preventDefault();
    navigate(REGISTER);
  };

  const emailAddressOnChangeHandler = (e) => {
    setEmailAddress(e.target.value);
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
          <Input name="emailAddress" inputContainerClassName={styles.formInput} label="Email Address" type="email" value={emailAddress} errorMessage={errorMessage} required onChangeHandler={emailAddressOnChangeHandler} />
          <Input name="password" inputContainerClassName={styles.formInput} label="Password" type="password" value={password} errorMessage={errorMessage} required onChangeHandler={passwordOnChangeHandler} />
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
