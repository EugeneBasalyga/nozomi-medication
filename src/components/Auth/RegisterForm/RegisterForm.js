import { useState } from 'react';

import { useAuth } from '../../../contexts/auth';
import Input from '../../Common/Input/Input';
import Button from '../../Common/Button/Button';

import styles from './RegisterForm.css';

const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  const registerHandler = async (e) => {
    e.preventDefault();
    const errors = [];

    if (!passwordRegex.test(password)) {
      errors.push({
        field: 'password',
        error: 'Password must be not less than 8 characters and contain at least one uppercase letter, one lowercase letter, and one number',
      });
    }

    if (errors.length === 0 && password !== repeatPassword) {
      errors.push({
        field: 'repeatPassword',
        error: 'Password and confirmation password do not match',
      });
    }

    if (errors.length !== 0) {
      setErrorMessages(errors);
    } else {
      const data = await register(email, password, repeatPassword);
      if (data.errors) {
        const errors = data.errors.map((error) => {
          return {
            field: error.param,
            error: error.msg,
          };
        });
        setErrorMessages(errors);
      }
    }
  };

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
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
          <Input name="email" inputContainerClassName={styles.formInput} label="Email Address" type="email" value={email} errorMessage={errorMessages.find((error) => error.field === 'email')} required onChangeHandler={emailOnChangeHandler} />
          <Input name="password" inputContainerClassName={styles.formInput} label="Password" type="password" value={password} errorMessage={errorMessages.find((error) => error.field === 'password')} required onChangeHandler={passwordOnChangeHandler} />
          <Input name="repeatPassword" inputContainerClassName={styles.formInput} label="Repeat password" type="password" value={repeatPassword} errorMessage={errorMessages.find((error) => error.field === 'repeatPassword')} required onChangeHandler={repeatPasswordOnChangeHandler} />
          <div className={styles.buttonContainer}>
            <Button className={styles.buttonSignUp} value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
