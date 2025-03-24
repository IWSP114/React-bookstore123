
import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import './PasswordReset.css'
import closeEyeIcon from "../../assets/close-eye-icon.png"
import openEyeIcon from "../../assets/open-eye-icon.png"
import { useParams } from 'react-router-dom';

function PasswordReset() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [eightCharacters, setEightCharacters] = useState(false);
    const [haveLowercase, setHaveLowercase] = useState(false);
    const [haveUppercase, setHaveUppercase] = useState(false);
    const [haveNumber, setHaveNumber] = useState(false);
    const [metPassword, setMetPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [message, setMessage] = useState("");

    const form = useRef();
    const { encryptedEmail } = useParams();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { encryptedEmail: encryptedEmail, newPassword: password };

        try {
            setMessage(encryptedEmail);
            const response = await axios.patch(`${import.meta.env.VITE_API_URL}password-reset`, data); 
            if(response.status === 200) {
              setMessage("Password reset successful.")
            }
        } catch (error) {
            setMessage('Error: ', error, ' \nSession Failed, please try again later.'); // Set error message in state
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
      setMetPassword(passwordValue === confirmPassword);
      console.log(passwordValue, " : ", confirmPassword);

      const isValid = passwordValue.length >= 8 &&
                      /[a-z]/.test(passwordValue) &&
                      /[A-Z]/.test(passwordValue) &&
                      /\d/.test(passwordValue) &&
                      passwordValue === confirmPassword;

      console.log(isValid, ' password value: ',passwordValue, 'confirm password: ', confirmPassword);
      setIsDisabled(!isValid);
  }

  function handleConfirmPassword(event) {

    setConfirmPassword(event.target.value)
    const passwordValue = event.target.value; // password value = confirm password
    setMetPassword(passwordValue === password);

    const isValid = password.length >= 8 &&
                      /[a-z]/.test(password) &&
                      /[A-Z]/.test(password) &&
                      /\d/.test(password) &&
                      passwordValue === password;

    console.log(isValid, ' password value: ',passwordValue, 'confirm password: ', password);
    setIsDisabled(!isValid);
  }

    useEffect(() => {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && password !== "") {
                    handleSubmit(event);
                }
            });
    
            return () => document.removeEventListener('keydown', handleSubmit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [password])

    return (
        <>
            <div className="lost-password-container">
                <h2>Password Reset</h2>
                <form ref={form} onSubmit={handleSubmit}>
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
                        <label htmlFor="confirm-password">Confirm Password:</label>
                        <div className="password-input">
                            <input type={showPassword ? 'text' : 'password'} onChange={handleConfirmPassword} id="password" name="password" value={confirmPassword} required/>
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
                            <li style={{color: (metPassword ? 'green' : 'red')}}>Met password</li>
                        </ul>
                        <span className="error-message">{message}</span>
                    </div>
                    <div className="submit-group">
                        <input type="submit" value="Submit" disabled={isDisabled}/>
                    </div>
                </form>
            </div>
        </>
    );
}

export default PasswordReset;