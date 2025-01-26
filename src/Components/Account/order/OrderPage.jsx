import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react"
import { decryptData } from '../../../utility/crypto';
import { useNavigate, Link } from 'react-router-dom';
import ToTwoDecimal from '../../../utility/ToTwoDecimal';

import './OrderPage.css'
import AccountOpinion from '../account-opinion/account-opinions';


function OrderPage() {
  const navigate = useNavigate();
  const [cookies] = useCookies(['user']);
  const [username, setUsername] = useState("Guest");

  const Orders = [
    {
      orderID: "#IJ34567890ABCDE",
      date: "2025-01-25",
      status: "Comfirmed",
      total_prices: 30.00,
      total_quantity: 1
    }
  ];

  useEffect(() => {
      const usernameCookie = cookies.user ? decryptData(cookies.user).username : 'Guest';
      if(usernameCookie === 'Guest') {
        navigate('/login');
      }
      setUsername(usernameCookie);

  }, [cookies.user, navigate, username]);

  return (
    <div className="order-body-container">
      <div className="order-page-title">
        Account
      </div>

      <div className="order-page-context">

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

        <div className="order-lists">
            <div className="order-lists-title-container">
                    <span className="order-lists-title-order">ORDER</span>
                    <span className="order-lists-title-date">DATE</span>
                    <span className="order-lists-title-status">STATUS</span>
                    <span className="order-lists-title-total">TOTAL</span>
                    <span className="order-lists-title-actions">ACTIONS</span>
            </div>

            <div className="order-lists-context-container">
                {/* Map function */}
                {Orders.map((OrderItem)=> 
                <div className="order-item-container" key={OrderItem.orderID}>
                    <span className="order-lists-item-order"><Link to="/orders/123">{OrderItem.orderID}</Link></span>
                    <span className="order-lists-item-date">{OrderItem.date}</span>
                    <span className="order-lists-item-status">{OrderItem.status}</span>
                    <span className="order-lists-item-total"><b>USD${ToTwoDecimal(OrderItem.total_prices)}</b> for {OrderItem.total_quantity} item</span>
                    <span className="order-lists-item-actions">ACTIONS</span>
                </div>
                )}
                 {/*   Map function  */}
            </div>
        </div>

      </div>
    </div>
    
  )
}

export default OrderPage