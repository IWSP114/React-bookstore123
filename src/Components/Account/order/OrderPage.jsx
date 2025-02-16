//import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react"
//import { decryptData } from '../../../utility/crypto';
import { Link } from 'react-router-dom';
import useAuthRedirect from '../../../utility/useAuthRedirect';

import './OrderPage.css'
import AccountOpinion from '../account-opinion/account-opinions';
import axios from 'axios';


function OrderPage() {
  //const [cookies] = useCookies(['user']);

  const [data, setData] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const { userID, loadingAuth } = useAuthRedirect();
  console.log(userID);

  useEffect(() => {
    if(!loadingAuth) {
      const fetchData = async () => {
        try {
            //const usernameID = cookies.user ? decryptData(cookies.user).id : 0;
            console.log(userID);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}getOrder/${userID}`);
            setData(response.data.data); // Update state with fetched data
            console.log(response.data.data);
            //console.log(usernameID);
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };
    fetchData(); 
    }

  }, [loadingAuth, userID]); 
  
  if (loadingAuth) return <div>Loading...</div>; // Display loading state
  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div className="order-body-container">
      <div className="order-page-title">
        Account
      </div>

      <div className="order-page-context">

        <AccountOpinion />

        <div className="order-lists">
            <div className="order-lists-title-container">
                    <span className="order-lists-title-order">ORDER</span>
                    <span className="order-lists-title-date">DATE</span>
                    <span className="order-lists-title-status">STATUS</span>
                    <span className="order-lists-title-total">TOTAL</span>
                    <span className="order-lists-title-actions">ACTIONS</span>
            </div>

            <div className="order-lists-context-container">
                {data.map((OrderItem)=> 
                <div className="order-item-container" key={OrderItem.ordersID}>
                    <span className="order-lists-item-order"><Link to={`/orders/${OrderItem.ordersID}`}>{OrderItem.ordersID}</Link></span>
                    <span className="order-lists-item-date">{OrderItem.ordersDate}</span>
                    <span className="order-lists-item-status">{OrderItem.orderStatus}</span>
                    <span className="order-lists-item-total"><b>USD${OrderItem.subtotalPrice}</b> for {OrderItem.totalAmounts} item</span>
                    <span className="order-lists-item-actions">ACTIONS</span>
                </div>
                )}
            </div>
        </div>

      </div>
    </div>
    
  )
}

export default OrderPage