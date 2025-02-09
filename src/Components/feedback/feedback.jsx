
import { useState } from 'react'
import axios from 'axios'; // Import Axios
import useAuthRedirect from '../../utility/useAuthRedirect';
import './feedback.css'

function Feedback() {

    const [feedback, setFeedback] = useState("");
    const [message, setMessage] = useState("");
    const { userID, loadingAuth } = useAuthRedirect();
    const [feedbackLength, setFeedbackLength] = useState(0);
  
    const handleSubmit = async (event) => {
        event.preventDefault();

        const Data = { userID: userID, feedback: feedback };
        try {
            const response = await axios.post('http://localhost:5000/api/create-feedback', Data);

            if(response.status === 200 && response.data.message === 'Success!') {
                //Good
                setMessage("We have received your message! Thanks for your opinions!");
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
        }
        setFeedback("");
        setFeedbackLength(0)
    };

    const handleFeedbackChange = (event) => {
      setFeedback(event.target.value);
      setFeedbackLength(event.target.value.length);
      console.log(event.target.value.length);
    }

    if(loadingAuth) return <div>Loading...</div>;
    return (
        <>
            <div className="feedback-container">
                <h2>Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="feedback">Please tell us your opinions:</label>
                        <textarea id="feedback" rows="2" name="feedback" onChange={handleFeedbackChange} value={feedback} required/>
                        <span className="feedback-length">{feedbackLength}/5000</span>
                    </div>
                    
                    <div className="submit-group">
                        <input type="submit" value="Submit"/><br/>
                        <span className="message">{message}</span>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Feedback;