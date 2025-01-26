import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from "react"
import { encryptData, decryptData } from '../../../utility/crypto';
import { useNavigate, Link } from 'react-router-dom';

import './ModifyProfilePage.css'
import AccountOpinion from '../account-opinion/account-opinions';


function ModifyProfilePage() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);
  const [username, setUsername] = useState("Guest");
  const messageRef = useRef();

  useEffect(() => {
      const usernameCookie = cookies.user ? decryptData(cookies.user).username : 'Guest';
      if(usernameCookie === 'Guest') {
        navigate('/login');
      }
      setUsername(usernameCookie);

  }, [cookies.user]);

  const [newUsername, setNewUsername] = useState("Username");
  const [newDisplayName, setNewDisplayName] = useState("Username");
  const [newEmail, setNewEmail] = useState("example@gmail.com");
  const [message, setMessage] = useState("");

  function handleUsernameChange(event) {
    setNewUsername(event.target.value);
    NameError(event.target.value, newDisplayName);
  }

  function handleDisplayNameChange(event) {
    setNewDisplayName(event.target.value);
    NameError(newUsername, event.target.value);
  }

  function NameError(usernameGet, displayNameGet) {
    if(usernameGet === 'Guest' || displayNameGet === 'Guest') {
      setMessage("Invalid Display Name or Username");
    } else {
      setMessage("");
    }
  }

  function handleEmailChange(event) {
    setNewEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    if(newUsername !== '' && newDisplayName !== '' && newEmail !== '') {

      event.preventDefault();
      //submit to backend

      //After finish
      const userData = { username: newDisplayName };
      const encryptedData = encryptData(userData);
      setCookie('user', encryptedData, { path: '/', maxAge: 3000 });

      setNewUsername("");
      setNewDisplayName("");
      setNewEmail("");
    }
    
  }

  return (
    <div className="account-edit-container">
      <div className="account-edit-page-title">
        Account
      </div>

      <div className="account-edit-context">
        <AccountOpinion />
        {/* 
        <div className="account-opinions">
              <div className="account-opinions-username-container">
                <span>{username}</span>
              </div>

              <div className="account-opinions-opinion-container">
                <Link to="/orders"><div className="account-opinions-opinion">Order</div></Link>
                <Link to="/orders"><div className="account-opinions-opinion">Modify profile</div></Link>
                <Link to="/orders"><div className="account-opinions-opinion">Lost password</div></Link>
                <Link to="/logout"><div className="account-opinions-opinion">Log Out</div></Link>
              </div>
        </div>
        */}

        <div className="account-edit-form">
          <form onSubmit={handleSubmit} action="#">
            <label htmlFor="username" className="username-title">Username:</label>
            <input id="username" className="username" value={newUsername} onChange={(e) => handleUsernameChange(e)} required/>

            <label htmlFor="display-name" className="display-name-title">Display Name:</label>
            <input id="display-name" className="display-name" value={newDisplayName} onChange={(e) => handleDisplayNameChange(e)} required />
            <span><i>This will be how your name will be displayed in the account section and in reviews.</i></span>

            <label htmlFor="email" className="email-title">Email Address:</label>
            <input id="email" className="email" value={newEmail} onChange={(e) => handleEmailChange(e)} required />

            <span ref={messageRef} className="error-message">{message}</span>

            <button type="submit" className="save-changes-button" disabled={message}>Save Changes</button>
            
          </form>
        </div>

      </div>
    </div>
    
  )
}

export default ModifyProfilePage