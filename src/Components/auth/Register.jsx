
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import closeEyeIcon from "../../assets/close-eye-icon.png"
import openEyeIcon from "../../assets/open-eye-icon.png"
import axios from 'axios';
import './Register.css'


function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [eightCharacters, setEightCharacters] = useState(false);
    const [haveLowercase, setHaveLowercase] = useState(false);
    const [haveUppercase, setHaveUppercase] = useState(false);
    const [haveNumber, setHaveNumber] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && isDisabled === false) {
                    handleSubmit(event);
                }
            });

            return () => {
                document.removeEventListener('keydown', handleSubmit)
            }
        })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { email: email, username: username, password: password };
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}register`, userData);

            if(response.status === 200 && response.data.message === 'Register successful!') {
                navigate('/login'); // Navigate after successful login
            } 
        } catch (error) {
            // Suppress default error logging
            if (error.response) {
                // Handle known errors from server responses
                setErrorMessage(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage('No response received from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage('An error occurred while making the request.');
            }
            // Clear input fields after an error
            setUsername("");
            setPassword("");
        }
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
                <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                        <label htmlFor="email">Email Address:</label>
                        <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} value={username} required/>
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
                        <span className="error-message">{errorMessage}</span>
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