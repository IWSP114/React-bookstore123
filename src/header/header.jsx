import { Link } from 'react-router-dom';
import { decryptData } from '../utility/crypto.js'
import { useCookies } from 'react-cookie';
import { useContext, useEffect, useState } from "react"
import { CartContext } from '../utility/CartLoader.jsx';

import "./lower-header.css"
import "./upper-header.css"
import homeLogo from '../assets/home-icon.png';
import newLogo from '../assets/new-icon.png';
import randomLogo from '../assets/random-icon.png';
import cartLogo from '../assets/shopping-cart-icon.png'

function Header() {
    const [cookies] = useCookies(['user']);
    const [username, setUsername] = useState("Guest");

    useEffect(() => {
        const usernameCookie = cookies.user ? decryptData(cookies.user).username : 'Guest';
        if (username !== usernameCookie) {
            setUsername(usernameCookie);
        }
    }, [cookies.user, username]);
    
    const { cart,  } = useContext(CartContext);

  return (
    <nav className="nav-bar">
    <div className="upper-nav-bar">
        <div className="upper-nav-bar-left">

             <ul>
                 <li><div className="shop-name"><span>Book Store 123</span></div></li>
                 <li><Link to="/" className="nav-link"><span>Home</span></Link></li>
                 <li><Link to="/services" className="nav-link"><span>Services</span></Link></li>
                 <li><Link to="/about" className="nav-link"><span>About Us</span></Link></li>
             </ul> 

           
         </div>
         <div className="upper-nav-bar-right">
            <div className="welcome-message">Welcome, <b><u>{username}</u></b></div>
            {
                username === "Guest"
                ? 
                <>
                    <div className="login-option-container">
                    <Link to="/login" className="nav-link">Login</Link>
                    <div className="option-space">&nbsp;</div>
                    <Link to="/register" className="nav-link">Register</Link>
                     </div>
                </>
                : 
                <>
                    <div className="option-space">&nbsp;</div>
                    <div className="login-option-container">
                    <Link to="/cart" className="nav-link">
                    <div className="cart-icon-container">
                        <img src={cartLogo} className="icon-image" />
                        <span className="cart-item-quantity">{cart.length}</span>
                    </div>
                    </Link>
                    </div>

                    <div className="option-space">&nbsp;</div>
                    <div className="login-option-container">
                    <Link to="/logout" className="nav-link">Logout</Link>
                    </div>
                </>
            }
            
         </div>
    </div>

    <div className="lower-nav-bar">
        <ul>
            <li>
                <Link to="/" className="nav-link">
                    <div className="item-container">
                        <img src={homeLogo} className="icon-image" />
                        <span>Home</span>
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/product" className="nav-link">
                    <div className="item-container">
                        <img src={newLogo} className="icon-image" />
                        <span>Products</span>
                    </div>
                </Link>
            </li>

            <li>
                <Link to="/random" className="nav-link">
                    <div className="item-container">
                        <img src={randomLogo} className="icon-image" />
                        <span>Random Book</span>
                    </div>
                </Link>
           </li>

        </ul> 
    </div>
</nav>
  );
}

export default Header