
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react'
import closeEyeIcon from "../../assets/close-eye-icon.png"
import openEyeIcon from "../../assets/open-eye-icon.png"
import './LostPassword.css'

function LostPssword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const form = useRef();
  
    const handleSubmit = (event) => {
        event.preventDefault();

        navigate('/');

    };

    function handleShowPassword() {
        setShowPassword(showPassword ? false : true);
    }

    useEffect(() => {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && email !== "" && password !== "") {
                    handleSubmit(event);
                }
            });
    
            return () => document.removeEventListener('keydown', handleSubmit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [password, email])

    return (
        <>
            <div className="lost-password-container">
                <h2>Lost Password</h2>
                <form ref={form} onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Please input your email:</label>
                        <div className="email-input">
                            <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" name="email" required/>
                        </div>
                    </div>

                    <div className="form-group">
                                            <label htmlFor="password">Please input your New Password:</label>
                                            <div className="password-input">
                                                <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} id="password" name="password" value={password} required/>
                                                <button type="button" onClick={() => handleShowPassword()} className="password-showing-button">
                                                <img src={showPassword ? openEyeIcon : closeEyeIcon} className="password-showing-icon"/>
                                            </button>
                                            </div> 
                    </div>
                    
                    <div className="submit-group">
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LostPssword;