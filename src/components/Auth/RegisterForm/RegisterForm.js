import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../../contexts/auth';
import Input from '../../Common/Input/Input';
import PasswordInput from '../../Common/PasswordInput/PasswordInput';
import Button from '../../Common/Button/Button';
import { LOGIN } from '../../../router/consts';
import logo from '../../../assets/pfizer-logo.png';

import styles from './RegisterForm.scss';

const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const registerHandler = async (e) => {
    e.preventDefault();
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
      <div className={styles.registerPageTitle}>
        SIGN UP WITH EMAIL
      </div>
      <div className={styles.registerBoxContainer}>
        <div className={styles.logoContainer}>
          <img className={styles.logoImage} src={logo} alt="Pfizer Logo" />
        </div>
        <div className={styles.registerContentContainer}>

          <div className={styles.registerTitle}>
            <h4>Sign up with email</h4>
          </div>
          <div className={styles.registerForm}>
            <Input name="email" inputLabelContainerClassName={styles.inputContainer} inputClassName={styles.input} label="Email Address" type="email" value={email} errorMessage={errorMessages.find((error) => error.field === 'email')} required onChangeHandler={emailOnChangeHandler} />
            <PasswordInput name="password" inputLabelContainerClassName={styles.inputContainer} inputClassName={styles.input} label="Password" value={password} errorMessage={errorMessages.find((error) => error.field === 'password')} onChangeHandler={passwordOnChangeHandler} />
            <PasswordInput name="repeatPassword" inputLabelContainerClassName={styles.inputContainer} inputClassName={styles.input} label="Repeat password" value={repeatPassword} errorMessage={errorMessages.find((error) => error.field === 'repeatPassword')} onChangeHandler={repeatPasswordOnChangeHandler} />
            <div className={styles.buttonContainer}>
              <Button className={styles.buttonSignUp} value="Sign Up" onClickHandler={registerHandler} />
            </div>
          </div>
          <div className={styles.signInContainer}>
            <div className={styles.signInText}>
              Already have an account?&nbsp;
              <Link to={LOGIN}>Sign in</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
