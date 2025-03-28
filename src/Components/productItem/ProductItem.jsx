import { useState, useEffect, useRef, useCallback } from "react";
import { AddToCartButton } from "../../utility/AddToCart/AddToCart";
import { useParams } from 'react-router-dom';
//import ImageLoader from "../../utility/ImageLoader/ImageLoader";
import './Product-Item.css'
import axios from "axios";
import AddToWishlist from "./addToWishlist/addToWishlist";

function ProductItem() {

      let { ProductID } = useParams();
      const [quantity, setQuantity] = useState(1);
      const [activeImage, setActiveImage] = useState();
      const dialogRef = useRef();

      const [data, setData] = useState([]); // State for storing fetched data
      const [imageURL, setImageURL] = useState();
      const [loading, setLoading] = useState(true); // State for loading status
      const [error, setError] = useState(null); // State for error handling

      useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}getProduct/${ProductID}`); 
                setData(response.data.Products[0]); // Update state with fetched data
                setImageURL(response.data.Products[0].imageUrl);
                console.log(response.data.Products[0]);
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };
    
        fetchData(); 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); 

      const handleSubtractChange = useCallback(() => {
        if(quantity > 1) {
            setQuantity(q => q - 1);
        }
    }, [quantity]);

    const handleAddChange = useCallback(() => {
        if(quantity <= data.stock-1) {
            setQuantity(q => q + 1);
        }
    }, [data.stock, quantity]);
      
      function closeModal() {
        dialogRef.current?.close();
        setActiveImage(undefined);
      }

      // const data = useMemo(() => {
      //   return  products.find((product) => {
      //           //console.log(product.productID === ProductID);
      //           return product.productID === ProductID;
      //           });
      // }, [products, ProductID])

      
      useEffect(()=> {
        if(!activeImage) return;
        dialogRef.current?.showModal();
      }, [activeImage])

      if (loading) return <div>Loading...</div>; // Display loading state
      if (error) return <div>Error: {error}</div>; // Display error message

      return (
        <>
          <dialog ref={dialogRef}>
            {activeImage && (
              <>
                <div className="dialog-div">
                  <img src={imageURL} alt="Loading" style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'contain'
                  }}/>
                  <button className="dialog-button" onClick={closeModal}>
                    X
                  </button>
                </div>
            </>
            )}
          </dialog>
          <div className="product-item-body-container">
          <div className="product-item-container">
            <div className="product-item-picture-container">
              <span onClick={() => setActiveImage(data)}>
              <img src={imageURL} alt="Loading" style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain'
              }}/>
              </span>
                
            </div>
            <div className="product-item-context-container">
                  <span className="product-item-context-title">{data.name}</span>
                  <span className="product-item-context-categories">Stock remained: {data.stock}</span>
                  <span className="product-item-context-author">Author: {data.author}</span>
                  <span className="product-item-context-tags">Tags: {data.type}</span>
                  <span className="product-item-context-prices">Prices: USD ${data.price}</span>
                  <div className="product-item-context-instructions">Description: <br/>{data.description}</div>
                  <AddToWishlist productID={ProductID}/>
                  <div className="product-item-context-quantity-container">
                    <button className="product-item-context-quantity-subtract-button" onClick={handleSubtractChange}>-</button>
                    <span className="product-item-context-quantity-display">{quantity}</span>
                    <button className="product-item-context-quantity-add-button" onClick={handleAddChange}>+</button>
                  </div>

                  {data.stock > 0 ? (
                    <AddToCartButton 
                        productID={data.productID} 
                        name={data.name} 
                        price={data.price} 
                        quantity={quantity} 
                        imageURL={imageURL} 
                    />
                  ) : (
                    <span>Out of Stock</span>
                  )}
            </div>
          </div>
        </div>
        </>
        
      );
}

export default ProductItem;