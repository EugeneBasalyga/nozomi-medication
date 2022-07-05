import { useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

import styles from './RegisterForm.css';

const RegisterForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({});
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  const registerHandler = (e) => {
    e.preventDefault();
    let hasError = false;

    if (password !== repeatPassword) {
      setErrorMessage({
        field: 'repeatPassword',
        error: 'Your password and confirmation password do not match',
      });
      hasError = true;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage({
        field: 'password',
        error: 'Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters',
      });
      hasError = true;
    }

    if (!hasError) {
      setErrorMessage({});
    }
  };

  const emailAddressOnChangeHandler = (e) => {
    setEmailAddress(e.target.value);
  };

  const passwordOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const repeatPasswordOnChangeHandler = (e) => {
    setRepeatPassword(e.target.value);
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerTitle}>
        <h4>Sign Up</h4>
      </div>
      <div className={styles.registerForm}>
        <form onSubmit={registerHandler}>
          <Input name="emailAddress" className={styles.formInput} label="Email Address" type="email" errorMessage={errorMessage} required onChangeHandler={emailAddressOnChangeHandler} />
          <Input name="password" className={styles.formInput} label="Password" type="password" errorMessage={errorMessage} required onChangeHandler={passwordOnChangeHandler} />
          <Input name="repeatPassword" className={styles.formInput} label="Repeat password" type="password" errorMessage={errorMessage} required onChangeHandler={repeatPasswordOnChangeHandler} />
          <div className={styles.buttonContainer}>
            <Button className={styles.buttonSignUp} value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
