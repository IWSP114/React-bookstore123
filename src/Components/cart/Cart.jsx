
import { useContext, useEffect, memo } from "react"
import { CartContext } from "../../utility/CartLoader.jsx"
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import rubbishIcon from "../../assets/rubbish-bin-icon.png"
import { decryptData } from '../../utility/crypto.js'
import { useCookies } from 'react-cookie';
import ImageLoader from "../../utility/ImageLoader/ImageLoader.jsx";
import ToTwoDecimal from "../../utility/ToTwoDecimal.js";


function Cart() {
    const navigate = useNavigate();
    const { cart, setCart } = useContext(CartContext);
    const [cookies] = useCookies(['user']);
    const username = cookies.user ? decryptData(cookies.user).username : 'Guest';

    
    useEffect(()=> {
      if(username === 'Guest') {
        navigate('/login');
      }
    })

    function handlePlaceOrder() {
      setCart([]);
      navigate('/');
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
                </div>
              </div>
              
            </div>
            
        </>
    );
}

export default memo(Cart);