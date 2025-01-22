import { encryptData } from '../../utility/crypto.js'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import closeEyeIcon from "../../assets/close-eye-icon.png"
import openEyeIcon from "../../assets/open-eye-icon.png"
import './Login.css'

function Login() {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['user']);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && username !== "" && password !== "") {
                handleSubmit(event);
            }
        });

        return () => document.removeEventListener('keydown', handleSubmit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password, username])
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = { username: username };
        const encryptedData = encryptData(userData);
        setCookie('user', encryptedData, { path: '/', maxAge: 3000 });
        
        navigate('/');
    };

    function handleShowPassword() {
        setShowPassword(showPassword ? false : true);
    }

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-input">
                            <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} id="password" name="password" value={password} required/>
                            <button type="button" onClick={() => handleShowPassword()} className="password-showing-button">
                            <img src={showPassword ? openEyeIcon : closeEyeIcon} className="password-showing-icon"/>
                        </button>
                        </div> 
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