import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/auth';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { REGISTER } from '../../router/consts';

import './LoginForm.css';

const LoginForm = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const loginHandler = (e) => {
        e.preventDefault();
        login(emailAddress, password);
    }

    const registerOnClickHandler = (e) => {
        e.preventDefault();
        navigate(REGISTER);
    }

    const emailAddressOnChangeHandler = (e) => {
        setEmailAddress(e.target.value)
    }

    const passwordOnChangeHandler = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="login-container">
            <div className="login-title">
                <h4>Sign In</h4>
            </div>
            <div className="login-form">
                <form onSubmit={loginHandler}>
                    <Input label="Email Address" type="email" required={true} onChangeHandler={emailAddressOnChangeHandler}/>
                    <Input label="Password" type="password" required={true} onChangeHandler={passwordOnChangeHandler}/>
                    <Button className="button-signIn" value="Sign In" />
                </form>
            </div>
            <div className="signUp-container">
                <i className="signUp-text">Or Sign Up using</i>
                <Button className="button-signUp" value="Sign Up" onClickHandler={registerOnClickHandler} />
            </div>
        </div>
    );
}

export default LoginForm;