import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import Input from '../Input/Input';
import Button from '../Button/Button';

import styles from './RegisterForm.css';

const RegisterForm = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const registerHandler = (e) => {

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
          <Input label="Email Address" type="email" required onChangeHandler={emailAddressOnChangeHandler} />
          <Input label="Password" type="password" required onChangeHandler={passwordOnChangeHandler} />
          <Input label="Repeat password" type="password" required onChangeHandler={repeatPasswordOnChangeHandler} />
          <div className={styles.buttonContainer}>
            <Button className={styles.buttonSignUp} value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
