import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react"
import { decryptData } from '../../../utility/crypto';
import { useNavigate, Link } from 'react-router-dom';

import './OrderItemPage.css'
import AccountOpinion from '../account-opinion/account-opinions';

function OrderItemPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
      const usernameCookie = cookies.user ? decryptData(cookies.user).username : 'Guest';
      if(usernameCookie === 'Guest') {
        navigate('/login');
      }
      setUsername(usernameCookie);

  }, [cookies.user, navigate, username]);

  return (
    <div className="order-item-body-container">
      <div className="order-item-page-title">
        Account
      </div>

      <div className="order-item-page-context">

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

        <div className="order-item-context">
            <span>Order #IJ34567890ABCDE was placed on 2025-01-25 and is currently Comfirmed.</span>
            <span className="order-title">Order Details #IJ34567890ABCDE</span>

            <div className="order-item-details-container">
                <div className="order-item-title">
                  <span>PRODUCT</span>
                  <span>TOTAL</span> 
                </div>

                <div className="order-item-details">
                  <span>PRODUCT NAME x 1</span>
                  <span><b>USD$30.00</b></span> 
                </div>

                <div className="order-item-details">
                  <span>PRODUCT NAME x 1</span>
                  <span><b>USD$30.00</b></span> 
                </div>

                <div className="order-item-details">
                  <span>Subtotal:</span>
                  <span><b>USD$60.00</b></span> 
                </div>

                <div className="order-item-details">
                  <span>Shipping:</span>
                  <span>SF Express</span> 
                </div>

                <div className="order-item-details">
                  <span>Payment method:</span>
                  <span>Electronic Payment</span> 
                </div>

                <div className="order-item-details">
                  <span>Total:</span>
                  <span><b>USD$60.00</b></span> 
                </div>
            </div>
        </div>

      </div>
    </div>
    
  )
}

export default OrderItemPage