import { useCookies } from 'react-cookie';
import { useEffect, useState } from "react"
import { decryptData } from '../../utility/crypto';
import { useNavigate, Link } from 'react-router-dom';

import './OrderPage.css'


function OrderPage() {
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
    <div className="order-body-container">
      <div className="order-page-title">
        Account
      </div>

      <div className="order-page-context">

        <div className="account-opinions">
          <div className="account-opinions-username-container">
            <span>{username}</span>
          </div>

          <div className="account-opinions-opinion-container">
            <Link to="/orders" className="nav-link"><div className="account-opinions-opinion">Order</div></Link>
            <Link to="/orders" className="nav-link"><div className="account-opinions-opinion">Modify profile</div></Link>
            <Link to="/logout" className="nav-link"><div className="account-opinions-opinion">Log Out</div></Link>
          </div>
        </div>

      </div>
    </div>
    
  )
}

export default OrderPage