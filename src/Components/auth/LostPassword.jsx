
import { useState, useRef, useEffect } from 'react'
import axios from 'axios';
import './LostPassword.css'

function LostPssword() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null); // State for error handling
    const [message, setMessage] = useState("");
    const form = useRef();
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { email: email };
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}lost-password`, data); 
            if(response.status === 200) {
              setMessage("If your email is correct, you will receive a email soon.")
              setEmail("");
            }
        } catch (error) {
            setError(error.message); // Set error message in state
        }
        

        

    };

    useEffect(() => {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' && email !== "") {
                    handleSubmit(event);
                }
            });
    
            return () => document.removeEventListener('keydown', handleSubmit);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [email])

    if (error) return <div>Error: {error}</div>; // Display error message
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
                    
                    <div className="submit-group">
                        <input type="submit" value="Submit"/>
                        <p>{message}</p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LostPssword;