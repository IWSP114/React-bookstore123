import { useCookies } from 'react-cookie';
import { useEffect, useRef, useState } from "react"
import { encryptData, decryptData } from '../../../utility/crypto';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './ModifyProfilePage.css'
import AccountOpinion from '../account-opinion/account-opinions';


function ModifyProfilePage() {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']);
  const usernameCookie = cookies.user ? decryptData(cookies.user).username : 'Guest';
  const [username, setUsername] = useState(usernameCookie);
  const messageRef = useRef();

  const [newUsername, setNewUsername] = useState("Username");
  const [newDisplayName, setNewDisplayName] = useState("Username");
  const [newEmail, setNewEmail] = useState("example@gmail.com");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
      const usernameCookie = cookies.user ? decryptData(cookies.user).username : 'Guest';
      if(usernameCookie === 'Guest') {
        navigate('/login');
      }
      setUsername(usernameCookie);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.user]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getUser/${username}`); // Replace with your API endpoint
            setNewUsername(response.data.userdata[0].username);
            setNewDisplayName(response.data.userdata[0].display_name);
            setNewEmail(response.data.userdata[0].email);

        } catch (error) {
            setError(error.message); // Set error message in state
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    fetchData(); // Call the fetch function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once on mount

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

  const handleSubmit = async (event) => {
    if(newUsername !== '' && newDisplayName !== '' && newEmail !== '') {

      event.preventDefault();
      //submit to backend
      const userData = { username: newUsername, email: newEmail, display_name: newDisplayName };
      try {
        const response = await axios.patch(`http://localhost:5000/updateUser/${username}`, userData);

        if(response.status === 200 && response.data.message === 'User information has been updated') {
            const encryptedData = encryptData(userData);
            setCookie('user', encryptedData, { path: '/', maxAge: 3000 });
            navigate('/'); // Navigate after successful login
        } 
      } catch (error) {
        // Suppress default error logging
        if (error.response) {
            // Handle known errors from server responses
            setMessage(error.response.data.message);
        } else if (error.request) {
            // The request was made but no response was received
            setMessage('No response received from server.');
        } else {
            // Something happened in setting up the request that triggered an Error
            setMessage('An error occurred while making the request.');
        }
        // Clear input fields after an error
        setNewUsername("");
        setNewDisplayName("");
        setNewEmail("");
      }
    }
    
  }

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div className="account-edit-container">
      <div className="account-edit-page-title">
        Account
      </div>

      <div className="account-edit-context">
        <AccountOpinion />

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