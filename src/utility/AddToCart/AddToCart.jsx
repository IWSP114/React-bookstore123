import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartLoader";
import { decryptData } from '../crypto.js';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './AddToCart.css'

export function AddToCartButton({ productID, name, price, quantity }) {
    const navigate = useNavigate();
    const [cookies] = useCookies(['user']);
    const username = cookies.user ? decryptData(cookies.user).username : 'Guest';
    const { cart, setCart } = useContext(CartContext);

    const [message, setMessage] = useState("");
    const [isActive, setIsActive] = useState(false);

    // Function to add item to cart
    const handleAddToCart = () => {

        if(username !== 'Guest') {
            // Check if the item already exists in the cart
            const existingItem = cart.find(item => item.productID === productID);
        
            if (existingItem) {
                // If it exists, update the quantity
                setCart(c => 
                    c.map(item =>
                        item.productID === productID
                            ? { ...item, quantity: item.quantity + quantity } // Increase quantity
                            : item
                    )
                );
            } else {
                // If it doesn't exist, add a new item with a unique ID
                const getID = cart.length > 0 ? cart[cart.length - 1].id + 1 : 1;
                setCart(c => [
                    ...c,
                    { 
                        id: getID, 
                        productID: productID, 
                        name: name, 
                        price: price, 
                        quantity: quantity 
                    }
                ]);
            }

            setMessage("A new item has been added");
            setIsActive(true);
            
        } else {
            navigate('/login');
        }
    }
    

    useEffect(()=> {
        const timer = setTimeout(()=> {
            setMessage(""); 
            setIsActive(false);
        }, 3000)

        return () => 
            clearTimeout(timer);
    }, [message])

    return (
        <div className="add-to-cart-button-container">
            <button onClick={() => { handleAddToCart()} } className={isActive ? "add-to-cart-button-active" : "add-to-cart-button"} disabled={isActive}>{isActive ? <>&#10004;</> : "Add to Cart"}</button>
            <div className="add-to-cart-message">{message}</div>
        </div>
        
    );
}

AddToCartButton.propTypes = {
    productID: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
};
