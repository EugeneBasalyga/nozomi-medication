import { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        auth.value.login(emailAddress, password);
        navigate("/");
    }

    const handleRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    }

    return (
        <div className="login-container">
            <div className="login-title">
                <h4>Sign In</h4>
            </div>
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <label>Email Address </label>
                        <input type="email" name="uname" required onChange={(e) => setEmailAddress(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <input className="button-signIn" type="submit" value="Sign In" />
                    </div>
                </form>
            </div>
            <div className="signUp-container">
                <i className="signUp-text">Or Sign Up using</i>
                <div className="button-container">
                    <input className="button-signUp" type="submit" value="Sign Up" onClick={handleRegister} />
                </div>
            </div>
        </div>
    );
}

export default LoginForm;