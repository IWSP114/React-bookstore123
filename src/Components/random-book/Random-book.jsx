import { useContext, useEffect } from "react";
import { ProductContext } from "../../utility/CartLoader";
import { useNavigate } from 'react-router-dom';


function RandomBook() {
  const { products,  } = useContext(ProductContext);
  const navigate = useNavigate();
  const randomNumber = Math.floor(Math.random() * products.length);

  useEffect(()=> {
    navigate(`/product/${products[randomNumber].productID}`);
  })
  
  return (
    <></>
  );
}
export default RandomBook