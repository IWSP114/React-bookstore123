import {useEffect, useState} from 'react'
import {CartContext} from './CartLoader'
import PropTypes from 'prop-types';

export function CartObject({ children }) {
CartObject.propTypes = {
  children: PropTypes.node
};
  
    const [cart, setCart] = useState(() => {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(()=>{
      console.log("Cart Updated");
    }, [cart])

    return (
      <CartContext.Provider value={{ cart, setCart }}>
          {children}
      </CartContext.Provider>
  );
}





