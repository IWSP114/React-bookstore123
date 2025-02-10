import { Link } from 'react-router-dom';
import useAuthRedirect from '../../../utility/useAuthRedirect';
//import { useNavigate } from 'react-router-dom';
import './account-opinions.css'

function AccountOpinion() {
  
  const { identity, username, loadingAuth } = useAuthRedirect();

  if (loadingAuth) return <div>Loading...</div>; // Display loading state
  if (identity === 'staff') return (
    <div className="account-opinions">
              <div className="account-opinions-username-container">
                <span>{username}</span>
              </div>

              <div className="account-opinions-opinion-container">
                <Link to="/staff/create-products"><div className="account-opinions-opinion">Create</div></Link>
                <Link to="/staff/products-controll"><div className="account-opinions-opinion">Products</div></Link>
                <Link to="/staff/order-control"><div className="account-opinions-opinion">Orders</div></Link>
                <Link to="/staff/feedbacks-control"><div className="account-opinions-opinion">Feedbacks</div></Link>
                <Link to="/logout"><div className="account-opinions-opinion">Log Out</div></Link>
              </div>
    </div>
  )
  return (
    <div className="account-opinions">
              <div className="account-opinions-username-container">
                <span>{username}</span>
              </div>

              <div className="account-opinions-opinion-container">
                <Link to="/orders"><div className="account-opinions-opinion">Order</div></Link>
                <Link to="/wish-list"><div className="account-opinions-opinion">Wish-List</div></Link>
                <Link to="/account/edit-account"><div className="account-opinions-opinion">Modify profile</div></Link>
                <Link to="/lost-password"><div className="account-opinions-opinion">Lost password</div></Link>
                <Link to="/logout"><div className="account-opinions-opinion">Log Out</div></Link>
              </div>
    </div>
  );
}
export default AccountOpinion