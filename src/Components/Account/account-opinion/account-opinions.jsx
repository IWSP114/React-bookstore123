import { Link } from 'react-router-dom';
import useAuthRedirect from '../../../utility/checkLoginMiddleware';
import './account-opinions.css'

function AccountOpinion() {
  
  const { username, loadingAuth } = useAuthRedirect();

  if (loadingAuth) return <div>Loading...</div>; // Display loading state
  return (
    <div className="account-opinions">
              <div className="account-opinions-username-container">
                <span>{username}</span>
              </div>

              <div className="account-opinions-opinion-container">
                <Link to="/orders"><div className="account-opinions-opinion">Order</div></Link>
                <Link to="/account/edit-account"><div className="account-opinions-opinion">Modify profile</div></Link>
                <Link to="/lost-password"><div className="account-opinions-opinion">Lost password</div></Link>
                <Link to="/logout"><div className="account-opinions-opinion">Log Out</div></Link>
              </div>
    </div>
  );
}
export default AccountOpinion