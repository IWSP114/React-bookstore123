import { useEffect, useState } from "react"
import AccountOpinion from '../../Account/account-opinion/account-opinions'
import useAuthRedirect from "../../../utility/useAuthRedirect";
import { useNavigate, Link } from 'react-router-dom';

import './FeedbackContorl.css';
import axios from 'axios';


function FeedbackControl() {
  const navigate = useNavigate();

  const [data, setData] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const { identity, userID, loadingAuth } = useAuthRedirect();

  useEffect(() => {
    if(!loadingAuth && identity === 'staff') {
      const fetchData = async () => {
        try {
            //console.log(userID);
            const response = await axios.get(`http://localhost:5000/api/get-feedback`); // Replace with your API endpoint
            setData(response.data.data); // Update state with fetched data
            //console.log(response.data.data);
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };
    fetchData(); 
    } else if (!loadingAuth && identity !== 'staff') {
      return navigate('/', { replace: true });
    }

  }, [identity, loadingAuth, navigate, userID]); 
  
  if (loadingAuth) return <div>Loading...</div>; // Display loading state
  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div className="feedback-controller-body-container">
      <div className="feedback-controller-page-title">
        Feedback Controller
      </div>

      <div className="feedback-controller-page-context">
        <AccountOpinion />
       

        <div className="feedback-controller-control">
            <div className="feedback-controller-control-title-container">
                    <span className="feedback-controller-control-title-userID">UserID</span>
                    <span className="feedback-controller-control-title-feedback">Feedback</span>
                    <span className="feedback-controller-control-title-action">Action</span>
            </div>

            <div className="feedback-controller-control-context-container">
                {data.map((feedbackItem)=> 
                <div className="feedback-controller-item-container" key={feedbackItem.feedbackID}>
                    <span className="feedback-controller-control-item-userID">{feedbackItem.userID}</span>
                    <span className="feedback-controller-control-item-feedback"><Link to={`/staff/feedbacks-control/${feedbackItem.feedbackID}`}>{feedbackItem.feedback}</Link></span>
                    <span className="feedback-controller-control-item-action">Action</span>
                </div>
                )}
            </div>
        </div>

      </div>
    </div>
    
  )
}

export default FeedbackControl