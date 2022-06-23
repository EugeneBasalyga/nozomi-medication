import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import Input from '../Input/Input';
import Button from '../Button/Button';

import './RegisterForm.css';

const RegisterForm = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const registerHandler = (e) => {

    }

    const emailAddressOnChangeHandler = (e) => {
        setEmailAddress(e.target.value)
    }

    const passwordOnChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    const repeatPasswordOnChangeHandler = (e) => {
        setRepeatPassword(e.target.value)
    }

    return (
        <div className="register-container">
            <div className="register-title">
                <h4>Sign Up</h4>
            </div>
            <div className="register-form">
                <form onSubmit={registerHandler}>
                    <Input label="Email Address" type="email" required={true} onChangeHandler={emailAddressOnChangeHandler}/>
                    <Input label="Password" type="password" required={true} onChangeHandler={passwordOnChangeHandler}/>
                    <Input label="Repeat password" type="password" required={true} onChangeHandler={repeatPasswordOnChangeHandler}/>
                    <Button className="button-signUp" value="Sign Up" />
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;