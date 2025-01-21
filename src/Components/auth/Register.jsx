import {encryptData} from '../../utility/crypto.js'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import closeEyeIcon from "../../assets/close-eye-icon.png"
import openEyeIcon from "../../assets/open-eye-icon.png"
import './Register.css'


function Register() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['user']);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [eightCharacters, setEightCharacters] = useState(false);
    const [haveLowercase, setHaveLowercase] = useState(false);
    const [haveUppercase, setHaveUppercase] = useState(false);
    const [haveNumber, setHaveNumber] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && isDisabled === false) {
                    handleSubmit(event);
                }
            });
        })

    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = { username: username, email: email };
        const encryptedData = encryptData(userData);
        setCookie('user', encryptedData, { path: '/', maxAge: 300 });
        
        navigate('/');
    };

    function handleShowPassword() {
        setShowPassword(showPassword ? false : true);
    }

    function handlePasswordStrength(event) {
        setPassword(event.target.value);
        const passwordValue = event.target.value;
        setEightCharacters(passwordValue.length >= 8);
        setHaveLowercase(/[a-z]/.test(passwordValue));
        setHaveUppercase(/[A-Z]/.test(passwordValue));
        setHaveNumber(/\d/.test(passwordValue));

        const isValid = passwordValue.length >= 8 &&
                        /[a-z]/.test(passwordValue) &&
                        /[A-Z]/.test(passwordValue) &&
                        /\d/.test(passwordValue);
        setIsDisabled(!isValid);
    }

    return (
        <>
            <div className="register-container">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-input">
                            <input type={showPassword ? 'text' : 'password'} onChange={handlePasswordStrength} id="password" name="password" value={password} required/>
                            <button type="button" onClick={() => handleShowPassword()} className="password-showing-button">
                            <img src={showPassword ? openEyeIcon : closeEyeIcon} className="password-showing-icon"/>
                        </button>
                        </div> 
                    </div>


                    <div className="form-group">
                        <ul>
                            <li style={{color: (eightCharacters ? 'green' : 'red')}}>At least 8 characters long</li>
                            <li style={{color: (haveLowercase ? 'green' : 'red')}}>At least 1 lowercase letter</li>
                            <li style={{color: (haveUppercase ? 'green' : 'red')}}>At least 1 uppercase letter</li>
                            <li style={{color: (haveNumber ? 'green' : 'red')}}>At least 1 number</li>
                        </ul>
                    </div>
                    <div className="submit-group">
                        <input type="submit" value="Register" disabled={isDisabled}/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Register;