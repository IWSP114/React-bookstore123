import { useState, memo, useMemo, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { decryptData } from '../../../utility/crypto';
import { useNavigate } from 'react-router-dom';
import './AddToWishlist.css';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
function AddToWishlist({ productID }) {
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);

  const userIDCookie = useMemo(() => {
    return cookies.user ? decryptData(cookies.user).id : undefined;
  }, [cookies.user]);

  const userIdentityCookie = useMemo(() => {
    return cookies.user ? decryptData(cookies.user).identity : undefined;
  }, [cookies.user]);

  const [starActive, setStarActive] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/api/get-wish-list-by-productID/${productID}/${userIDCookie}`); // Replace with your API endpoint
          if((response.data.result) !== undefined) {
            setStarActive(true); 
          }
      } catch (error) {
          setError(error.message); 
      }
    };

    if(userIDCookie !== undefined) {
      fetchData(); 
    }

  }, [productID, userIDCookie])


  async function handleOnClick(event) {
    if(userIdentityCookie === 'staff') {
      navigate('/main', { replace: true });
    }

    if(userIDCookie !== undefined && starActive === false && userIdentityCookie !== 'staff') {
      console.log(userIDCookie);
      console.log(productID);
      // add to list with productID and userID

        event.preventDefault();

        const userData = { userID: userIDCookie, productID: productID };
        try {
            const response = await axios.post(`http://localhost:5000/api/add-to-wishlist`, userData);

            if(response.status === 200 && response.data.message === 'Success!') {
              setStarActive(s => !s);
            } 
        } catch (error) {
            // Suppress default error logging
            if (error.response) {
                // Handle known errors from server responses
                setError(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                setError('No response received from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An error occurred while making the request.');
            }
        }

    } else if (userIDCookie !== undefined && starActive === true && userIdentityCookie !== 'staff') {
      console.log("Delete");
      console.log(userIDCookie);
      console.log(productID);
      // remove from list with productID and userID
      
      event.preventDefault();

        const userData = { userID: userIDCookie, productID: productID };
        try {
            const response = await axios.delete(`http://localhost:5000/api/delete-from-wishlist`, {
              data: userData // Correctly send the data here
          });

            if(response.status === 200 && response.data.message === 'Success!') {
              setStarActive(s => !s);
            } 
        } catch (error) {
            // Suppress default error logging
            if (error.response) {
                // Handle known errors from server responses
                setError(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                setError('No response received from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError('An error occurred while making the request.');
            }
        }

    } else {
      navigate('/login', { replace: true });
    }
  }

  if (error) return <button className="add-to-wishlist-button">{error}</button>; // Display error message

  return (
    <button className="add-to-wishlist-button" onClick={handleOnClick}>
        <span className={`star-image ${starActive ? "active" : ""}`}>{starActive ? "★" : "☆" }</span>
        {starActive ? "Remove from wishlist" : "Add to wishlist" }
    </button>
  )
};

export default memo(AddToWishlist);
