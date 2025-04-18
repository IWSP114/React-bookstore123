import { encryptData } from '../../utility/crypto.js'
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import closeEyeIcon from "../../assets/close-eye-icon.png"
import openEyeIcon from "../../assets/open-eye-icon.png"
import axios from 'axios'; // Import Axios
import './Login.css'

function Login() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['user']);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [selectedOption, setSelectedOption] = useState("users");

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && username !== "" && password !== "") {
                handleSubmit(event);
            }
        });

        return () => document.removeEventListener('keydown', handleSubmit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, username])
  
    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = { table: selectedOption, username: username, password: password };
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}login`, userData);

            if(response.status === 200 && response.data.message === 'Success!') {
                if(selectedOption === 'users') {
                    const newcookie = {
                    id: response.data.data[0].id,
                    identity: 'user',
                    username: response.data.data[0].username,
                    display_name: response.data.data[0].display_name,
                    email: response.data.data[0].email
                    }
                    const encryptedData = encryptData(newcookie);
                    setCookie('user', encryptedData, { path: '/', maxAge: 3000 });
                    navigate('/'); // Navigate after successful login
                } else if (selectedOption === 'staff') {
                    const newcookie = {
                        id: response.data.data[0].id,
                        identity: 'staff',
                        username: response.data.data[0].username,
                        display_name: response.data.data[0].display_name,
                    }
                    const encryptedData = encryptData(newcookie);
                    setCookie('user', encryptedData, { path: '/', maxAge: 3000 });
                    navigate('/'); // Navigate after successful login
                }
                
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

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} value={username} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-input">
                            <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} id="password" name="password" value={password} required/>
                            <button type="button" onClick={() => handleShowPassword()} className="password-showing-button">
                            <img src={showPassword ? openEyeIcon : closeEyeIcon} className="password-showing-icon"/>
                        </button>
                        <p className="forgot-password"><Link to="/lost-password">Forgot password?</Link></p>
                        </div> 
                        <span className="error-message">{errorMessage}</span>
                    </div> 
                    <div className="form-group">
                        <label>Identity:</label>
                        <label>
                            <input
                                type="radio"
                                value="users"
                                checked={selectedOption === 'users'}
                                onChange={handleChange}
                                />
                            User
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="staff"
                                checked={selectedOption === 'staff'}
                                onChange={handleChange}
                                />
                            Staff
                        </label>
                    </div>
                    <div className="submit-group">
                        <input type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;