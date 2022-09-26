import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth';
import Input from '../../Common/Input/Input';
import PasswordInput from '../../Common/PasswordInput/PasswordInput';
import Button from '../../Common/Button/Button';
import { REGISTER } from '../../../router/consts';

import styles from './LoginForm.scss';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
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

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
    const errorMessagesCopy = errorMessages.filter((el) => el.field !== 'email');
    setErrorMessages(errorMessagesCopy);
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
    const errorMessagesCopy = errorMessages.filter((el) => el.field !== 'password');
    setErrorMessages(errorMessagesCopy);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBoxContainer}>
        <div className={styles.loginContentContainer}>

          <div className={styles.loginTitle}>
            <h4>Sign in</h4>
          </div>
          <div className={styles.loginForm}>
            <Input name="email" inputLabelContainerClassName={styles.inputLabelContainer} inputClassName={styles.input} label="Email Address" type="email" value={email} errorMessage={errorMessages.find((error) => error.field === 'email')} onChangeHandler={emailOnChangeHandler} />
            <PasswordInput name="password" inputLabelContainerClassName={styles.inputLabelContainer} inputClassName={styles.input} label="Password" value={password} errorMessage={errorMessages.find((error) => error.field === 'password')} onChangeHandler={passwordOnChangeHandler} />
            <div className={styles.buttonContainer}>
              <Button className={styles.buttonSignIn} value="Sign In" onClickHandler={loginHandler} />
            </div>
          </div>
          <div className={styles.signUpContainer}>
            <div className={styles.signUpText}>
              Don&apos;t have an account?&nbsp;
              <Link to={REGISTER}>Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
