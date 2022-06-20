import { useState } from 'react';
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        auth.value.login(userName, password);
        navigate("/");
    }

    return (
        <div className="login-container">
            <div className="login-title">
                <h4>Sign In</h4>
            </div>
            <div className="login-form">
                <form onSubmit={handleLogin}>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <input type="submit" value="Sign In" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;