import { useState } from 'react';
import { useAuth } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';

const RegisterForm = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();
    const auth = useAuth();

    const handleRegister = (e) => {

    }

    return (
        <div className="register-container">
            <div className="register-title">
                <h4>Sign Up</h4>
            </div>
            <div className="register-form">
                <form onSubmit={handleRegister}>
                    <div className="input-container">
                        <label>Email Address </label>
                        <input type="email" name="uname" required onChange={(e) => setEmailAddress(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="input-container">
                        <label>Repeat password </label>
                        <input type="password" name="pass" required onChange={(e) => setRepeatPassword(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <input className="button-signUp" type="submit" value="Sign Up" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;