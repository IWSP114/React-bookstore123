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
                <Link to="/orders"><div className="account-opinions-opinion">Order</div></Link>
                <Link to="/orders"><div className="account-opinions-opinion">Modify profile</div></Link>
                <Link to="/orders"><div className="account-opinions-opinion">Lost password</div></Link>
                <Link to="/logout"><div className="account-opinions-opinion">Log Out</div></Link>
              </div>
        </div>

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
                <div className="order-item-container">
                    <span className="order-lists-item-order"><Link to="/orders/123">#IJ34567890ABCDE</Link></span>
                    <span className="order-lists-item-date">2025-01-25</span>
                    <span className="order-lists-item-status">Comfirmed</span>
                    <span className="order-lists-item-total"><b>USD$30.00</b> for 1 item</span>
                    <span className="order-lists-item-actions">ACTIONS</span>
                </div>

                <div className="order-item-container">
                    <span className="order-lists-item-order"><Link to="/orders/123">#IJ34567890ABCDE</Link></span>
                    <span className="order-lists-item-date">2025-01-25</span>
                    <span className="order-lists-item-status">Comfirmed</span>
                    <span className="order-lists-item-total"><b>USD$30.00</b> for 1 item</span>
                    <span className="order-lists-item-actions">ACTIONS</span>
                </div>

                <div className="order-item-container">
                    <span className="order-lists-item-order"><Link to="/orders/123">#IJ34567890ABCDE</Link></span>
                    <span className="order-lists-item-date">2025-01-25</span>
                    <span className="order-lists-item-status">Comfirmed</span>
                    <span className="order-lists-item-total"><b>USD$30.00</b> for 1 item</span>
                    <span className="order-lists-item-actions">ACTIONS</span>
                </div>
                 {/*   Map function  */}
            </div>
        </div>

      </div>
    </div>
    
  )
}

export default OrderPage