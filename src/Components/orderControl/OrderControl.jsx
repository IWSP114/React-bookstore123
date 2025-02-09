import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import useAuthRedirect from "../../utility/useAuthRedirect";
import AccountOpinion from "../Account/account-opinion/account-opinions";
import Select from 'react-select';

import './OrderControl.css'
import axios from 'axios';


function OrderControl() {

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
            const response = await axios.get(`http://localhost:5000/api/getOrder`); // Replace with your API endpoint
            setData(response.data.data); // Update state with fetched data
            console.log(response.data.data);
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };
    fetchData(); 
    }

  }, [loadingAuth, userID]); 

  const options = [
    { value: 'Comfirmed', label: 'Comfirmed' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Shipping', label: 'Shipping' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Declined', label: 'Declined' },
  ];

  const handleChange = async (selectedOption, orderID) => {
    //setSelectedValue(selectedOption);
    console.log(`Option selected:`, selectedOption.value);
    try {
      const response = await axios.patch(`http://localhost:5000/api/updateOrder/${selectedOption.value}/${orderID}`);

      if(response.status === 200  && response.data.message === 'Success!') {
        console.log('Successful!')
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
        // Clear input fields after an error
    }
  };
  
  if (loadingAuth) return <div>Loading...</div>; // Display loading state
  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div className="order-body-container">
      <div className="order-page-title">
        Order Controller
      </div>

      <div className="order-page-context">
        <AccountOpinion />
       

        <div className="order-control">
            <div className="order-control-title-container">
                    <span className="order-control-title-order">ORDER</span>
                    <span className="order-control-title-date">DATE</span>
                    <span className="order-control-title-status">STATUS</span>
                    <span className="order-control-title-total">TOTAL</span>
                    <span className="order-control-title-actions">USER ID & NAME</span>
            </div>

            <div className="order-control-context-container">
                {data.map((OrderItem)=> 
                <div className="order-item-container" key={OrderItem.ordersID}>
                    <span className="order-control-item-order"><Link to={`/orders/${OrderItem.ordersID}`}>{OrderItem.ordersID}</Link></span>
                    <span className="order-control-item-date">{OrderItem.ordersDate}</span>
                    <span className="order-control-item-status-container"><Select className="order-control-item-status" defaultValue={{ value: OrderItem.orderStatus, label: OrderItem.orderStatus }} onChange={(e) => handleChange(e, OrderItem.ordersID)} options={options} /></span>
                    <span className="order-control-item-total"><b>USD${OrderItem.subtotalPrice}</b> for {OrderItem.totalAmounts} item</span>
                    <span className="order-control-item-actions">{OrderItem.customerID} {OrderItem.customerName}</span>
                </div>
                )}
            </div>
        </div>

      </div>
    </div>
    
  )
}

export default OrderControl