
import { useContext, useEffect, memo, useState } from "react"
import { CartContext } from "../../utility/CartLoader.jsx"
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import rubbishIcon from "../../assets/rubbish-bin-icon.png"
import { decryptData } from '../../utility/crypto.js'
import { useCookies } from 'react-cookie';
import ImageLoader from "../../utility/ImageLoader/ImageLoader.jsx";
import ToTwoDecimal from "../../utility/ToTwoDecimal.js";
import useAuthRedirect from "../../utility/checkLoginMiddleware.jsx";
import axios from "axios";


function Cart() {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);
    const [cookies] = useCookies(['user']);
    const [errorMessage, setErrorMessage] = useState("");
    const [userID, setUserID] = useState("");
    //const [loading, setLoading] = useState(true); // State for loading status
    //const [error, setError] = useState(null); // State for error handling
    
    const { loadingAuth } = useAuthRedirect();

    useEffect(() => {
      const usernameID = cookies.user ? decryptData(cookies.user).id : 0;
      setUserID(usernameID);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handlePlaceOrder() {

      const data = { 
        customerID: userID, 
        cart: cart , 
        price: (Math.round(cart.reduce((acc, item)=> acc + (item.quantity * item.price), 0) * 100) / 100).toFixed(2), 
        total: cart.reduce((acc, item)=> acc + item.quantity, 0)
      };

      try {
        const response = await axios.post('http://localhost:5000/create-order', data);

        if(response.status === 200  && response.data.message === 'Your order placed successfully!') {
          console.log('Successful!')
          setCart([]);
          localStorage.removeItem('cart');
          navigate('/');
        } 
      } catch (error) {
          // Suppress default error logging
          if (error.response) {
              // Handle known errors from server responses
              setErrorMessage(error.response.data.message);
          } else if (error.request) {
              // The request was made but no response was received
              setErrorMessage('No response received from server.');
          } else {
              // Something happened in setting up the request that triggered an Error
              setErrorMessage('An error occurred while making the request.');
          }
          // Clear input fields after an error
      }

    }

    function handleQuantityAdd(cartItem) {
      setCart(c => c.map((item)=> item.productID === cartItem.productID ? {...item, quantity: item.quantity+1 } : item));
    }

    function handleQuantitySubtract(cartItem) {
      if(cartItem.quantity !== 1) {
      setCart(c => c.map((item)=> item.productID === cartItem.productID ? {...item, quantity: item.quantity-1 } : item));
      }
    }

    const handleItemRemove = (cartItem) => {
      setCart(c => c.filter((item)=> item.id !== cartItem.id));
    }

    useEffect(()=> {
      console.log(cart);
    })

    if (loadingAuth) return <div>Loading...</div>; // Display loading state
    return (
        <>
            <div className="body-container">
              
              <div className="context-container">

                {cart.map((cartItem)=> 
                  <div className="cart-item-container" key={cartItem.id}>

                    <div className="item-image-container">
                      <ImageLoader
                        ProductID={cartItem.productID}
                        Width={100}
                        Height={100}
                      />
                    </div>

                    <div className="item-context-container">
                      <span className="item-context-Name">Name: {cartItem.name}</span><br/>

                      <button onClick={()=>handleQuantitySubtract(cartItem)} className="item-context-substract-button">-</button>
                      <span className="item-context-Quantity">{cartItem.quantity}</span>
                      <button onClick={()=>handleQuantityAdd(cartItem)} className="item-context-add-button">+</button>

                      <button className="item-context-remove-button" onClick={() => handleItemRemove(cartItem)}>
                        <img src={rubbishIcon} className="rubbish-icon"/>
                        </button>
                    </div>
                    
                  </div>
                  
                )}   
              </div> 
             

               
              <div className="payment-container">
                <div className="payment-title-container">
                  <span className="payment-title">Item Summary</span>
                </div>

                <div className="payment-context-container">
                  <span className="payment-message">Below listed items are you have pruchased.</span>
                  {
                  cart.map((cartItem)=> 
                    <div key={cartItem.id} className="item-context">
                      <span>{cartItem.name} (${ToTwoDecimal(cartItem.price)} x {cartItem.quantity})</span>
                      <span>${ToTwoDecimal(cartItem.price * cartItem.quantity)}</span>
                    </div>
                  )} 
                    <div className="payment-total">
                      <div className="payment-total-price">
                        <span>Total Price:</span>
                        <span>${(Math.round(cart.reduce((acc, item)=> acc + (item.quantity * item.price), 0) * 100) / 100).toFixed(2)}</span>
                      </div>
                    
                      <div className="payment-total-amount">
                        <span>Total Amount:</span>
                        <span>{cart.reduce((acc, item)=> acc + item.quantity, 0)}</span>
                      </div>
                      
                      <div className="payment-total-type">
                        <span>Total Items:</span>
                        <span>{cart.length}</span>
                      </div>
                    </div>

                    <div className="pay-button-container">
                      <button className="pay-button" onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                    <span className="error-message">{errorMessage}</span>
                </div>
              </div>
              
            </div>
            
        </>
    );
}

export default memo(Cart);