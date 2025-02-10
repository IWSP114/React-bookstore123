import { useEffect, useState } from "react"
import AccountOpinion from '../../Account/account-opinion/account-opinions'
import useAuthRedirect from "../../../utility/useAuthRedirect";
import { useNavigate, useParams} from 'react-router-dom';

import './FeedbackDetail.css';
import axios from 'axios';


function FeedbackDetail() {
  const navigate = useNavigate();
  let { FeedbackID } = useParams();

  const [data, setData] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const { identity, userID, loadingAuth } = useAuthRedirect();

  useEffect(() => {
    if(!loadingAuth && identity === 'staff') {
      const fetchData = async () => {
        try {
            //console.log(userID);
            const response = await axios.get(`http://localhost:5000/api/get-feedback/${FeedbackID}`); // Replace with your API endpoint
            setData(response.data.data[0]); // Update state with fetched data
            console.log(response.data.data[0]);
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

  }, [FeedbackID, identity, loadingAuth, navigate, userID]); 
  
  if (loadingAuth) return <div>Loading...</div>; // Display loading state
  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div className="feedback-detail-body-container">
      <div className="feedback-detail-page-title">
        Feedback Controller
      </div>

      <div className="feedback-detail-page-context">
        <AccountOpinion />
       

        <div className="feedback-detail-control">
          <div className="feedback-detail-control-title-container">
            <div className="feedback-detail-context-container">
              Feedback: <br/>
              {data.feedback}
            </div>
            <div className="feedback-detail-userID-container">
              From user: <br/>
              {data.userID} <br/>
              {data.username}
            </div>
            
          </div>
        </div>

      </div>
    </div>
    
  )
}

export default FeedbackDetail