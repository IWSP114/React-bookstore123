
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import useAuthRedirect from '../../../utility/useAuthRedirect';

import './OrderItemPage.css'
import AccountOpinion from '../account-opinion/account-opinions';
import axios from 'axios';
import ToTwoDecimal from "../../../utility/ToTwoDecimal";

function OrderItemPage() {
  let { OrderID } = useParams();

  const [data, setData] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  const { loadingAuth } = useAuthRedirect();

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getSingleOrder/${OrderID}`); // Replace with your API endpoint
            setData(response.data); // Update state with fetched data\
            console.log(data[0]);
        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    fetchData(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  if (loadingAuth) return <div>Loading...</div>; // Display loading state
  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
    <div className="order-item-body-container">
      <div className="order-item-page-title">
        Account
      </div>

      <div className="order-item-page-context">

        <AccountOpinion />

        <div className="order-item-context">
            <span>Order {data.data[0].ordersID} was placed on {data.data[0].ordersDate} and is currently Comfirmed.</span>
            <span className="order-title">Order Details {data.data[0].ordersID}</span>

            <div className="order-item-details-container">
                <div className="order-item-title">
                  <span>PRODUCT</span>
                  <span>TOTAL</span> 
                </div>

               {(data.products).map((product) =>
                <div className="order-item-details" key={product.productID}>
                <span>{product.productName} x {product.productQuantity}</span>
                <span><b>USD${ToTwoDecimal(product.productPrice * product.productQuantity)}</b></span> 
                </div>
              
              )}

                <div className="order-item-details">
                  <span>Subtotal:</span>
                  <span><b>USD${ToTwoDecimal(data.data[0].subtotalPrice)}</b></span> 
                </div>

                <div className="order-item-details">
                  <span>Shipping:</span>
                  <span><b>USD${ToTwoDecimal(data.data[0].shippingPrice)}</b></span> 
                </div>

                <div className="order-item-details">
                  <span>Payment method:</span>
                  <span>Electronic Payment</span> 
                </div>

                <div className="order-item-details">
                  <span>Total:</span>
                  <span><b>USD${ToTwoDecimal(data.data[0].subtotalPrice + data.data[0].shippingPrice)}</b></span> 
                </div>
            </div>
        </div>

      </div>
    </div>
    
  )
}

export default OrderItemPage