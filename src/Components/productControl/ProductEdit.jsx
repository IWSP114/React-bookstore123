import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//import ImageLoader from "../../utility/ImageLoader/ImageLoader";
import './ProductEdit.css'
import useAuthRedirect from "../../utility/useAuthRedirect";
import axios from "axios";

function ProductEdit() {

      let { ProductID } = useParams();
      const navigate = useNavigate();
      const { identity, loadingAuth } = useAuthRedirect();
      const [productID, setProductID] = useState("");
      const [Message, setMessage] = useState("");
      
      const [productName, setProductName] = useState("");
      const [productType, setProductType] = useState("");
      const [productAuthor, setProductAuthor] = useState("");
      const [productPrice, setProductPrice] = useState(0);
      const [productDescription, setProductDescription] = useState("");
      const [quantity, setQuantity] = useState(1);

      const [imageURL, setImageURL] = useState();
      const [loading, setLoading] = useState(true); // State for loading status
      const [error, setError] = useState(null); // State for error handling

      useEffect(() => {
        if(identity !== 'staff' && !loadingAuth) {
          navigate('/', { replace: true })
        } else {
          const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}getProduct/${ProductID}`);
                console.log(response.data.Products[0]);
                setProductID(response.data.Products[0].productID)
                setProductName(response.data.Products[0].name);
                setProductType(response.data.Products[0].type)
                setProductAuthor(response.data.Products[0].author)
                setProductPrice(response.data.Products[0].price)
                setProductDescription(response.data.Products[0].description)
                setImageURL(response.data.Products[0].imageUrl);
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
          };
          fetchData(); 
        }
        
        
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); 

      const handleSubtractChange = useCallback((quantityGet) => {
        if(quantity > 1 && quantity - quantityGet >= 1) {
            setQuantity(q => q - quantityGet);
        }
    }, [quantity]);

    const handleAddChange = useCallback((quantityGet) => {
            setQuantity(q => q + quantityGet);
    }, []);

    const handleSubmit = async (event) => {
      event.preventDefault();

      const Data = { 
        productID: productID, 
        productName: productName, 
        productType: productType, 
        productAuthor: productAuthor,
        productPrice: productPrice.toFixed(2),
        productDescription: productDescription,
        productStock: quantity
      };

      try {
          const response = await axios.patch(`${import.meta.env.VITE_API_URL}api/product-edit`, Data);

          if(response.status === 200 && response.data.message === "Success!") {
              console.log(response.data.message);
              setMessage("Product Edit Successful!")
          } 
      } catch (error) {
          // Suppress default error logging
          if (error.response) {
              // Handle known errors from server responses
              setError(error.response.data.message);
          } else if (error.request) {
              // The request was made but no response was received
              setError('No response received from server.');
          } else {
              // Something happened in setting up the request that triggered an Error
              setError('An error occurred while making the request.');
          }
          // Clear input fields after an error
      } finally {
        setProductName("");
        setProductType("");
        setProductAuthor("");
        setProductPrice(0);
        setProductDescription("");
        setQuantity(1);
      }
  };
      if (loadingAuth) return <div>Loading...</div>; // Display loading state
      if (loading) return <div>Loading...</div>; // Display loading state
      if (error) return <div>Error: {error}</div>; // Display error message

      return (
        <>
          <div className="product-edit-container">

            <div className="product-edit-picture-container">
              <img src={imageURL} alt="Loading" style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain'
              }}/>
            </div>

            <div className="product-edit-context-container">
                <h2>Edit Product</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <span className="product-edit-context-tags-title">Title:</span>
                    <textarea className="product-edit-context-title" value={productName} onChange={e => setProductName(e.target.value)} required/>
                  </div>
                  
                  <div className="form-group">
                    <span className="product-edit-context-tags-title">Categories:</span>
                    <input className="product-edit-context-tags" value={productType} onChange={e => setProductType(e.target.value)} required/>
                  </div>

                  <div className="form-group">
                    <span className="product-edit-context-author-title">Author:</span>
                    <input className="product-edit-context-author" value={productAuthor} onChange={e => setProductAuthor(e.target.value)} required/>
                  </div>
                  
                  <div className="form-group">
                    <span className="product-edit-context-prices-title">Prices: USD $:</span>
                    <input type="number" min="0" max="1000" step="0.01" className="product-edit-context-prices" value={productPrice} onChange={e => setProductPrice(parseFloat(e.target.value))} required/>
                  </div>

                  <div className="form-group">
                    <span className="product-edit-context-instructions-title">Description:</span>
                    <textarea className="product-edit-context-instructions" rows="6" cols="50" value={productDescription} onChange={e => setProductDescription(e.target.value)} required/>
                  </div>

                  <div className="form-group">
                    <span className="product-edit-context-instructions-title">New Stock:</span>

                    <div className="product-edit-context-quantity-container">
                      <button type="button" className="product-edit-context-quantity-subtract-button" onClick={() => handleSubtractChange(100)}>-100</button>
                      <button type="button" className="product-edit-context-quantity-subtract-button" onClick={() => handleSubtractChange(10)}>-10</button>
                      <button type="button" className="product-edit-context-quantity-subtract-button" onClick={() => handleSubtractChange(1)}>-1</button>

                      <button type="button" className="product-edit-context-quantity-add-button" onClick={() => handleAddChange(1)}>+1</button>
                      <button type="button" className="product-edit-context-quantity-add-button" onClick={() => handleAddChange(10)}>+10</button>
                      <button type="button" className="product-edit-context-quantity-add-button" onClick={() => handleAddChange(100)}>+100</button>

                      <input type="number" className="product-edit-context-quantity-display" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <button type="submit" className="submit-button">Save</button>
                    {Message}
                  </div>
                </form>
            </div>
          </div>

        </>
        
      );
}

export default ProductEdit;