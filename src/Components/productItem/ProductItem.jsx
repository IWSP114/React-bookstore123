import { useContext, useState, useMemo, useEffect, useRef } from "react";
import { ProductContext } from "../../utility/CartLoader";
import { AddToCartButton } from "../../utility/AddToCart/AddToCart";
import { useParams } from 'react-router-dom';
import ImageLoader from "../../utility/ImageLoader/ImageLoader";
import './Product-Item.css'

function ProductItem() {

      let { ProductID } = useParams();
      const [quantity, setQuantity] = useState(1);
      const [activeImage, setActiveImage] = useState();
      const { products,  } = useContext(ProductContext);
      const dialogRef = useRef();

      function handleSubtractChange() {
        if(quantity > 1) {
          setQuantity(q => q - 1);
        }
      }

      function handleAddChange() {
        if(quantity < 99) {
          setQuantity(q => q + 1);
        }
      }   
      
      function closeModal() {
        dialogRef.current?.close();
        setActiveImage(undefined);
      }

      const getSelectedItem = useMemo(() => {
        return  products.find((product) => {
                //console.log(product.productID === ProductID);
                return product.productID === ProductID;
                });
      }, [products, ProductID])
      
      useEffect(()=> {
        if(!activeImage) return;
        dialogRef.current?.showModal();
      }, [activeImage])

      return (
        <>
          <dialog ref={dialogRef}>
            {activeImage && (
              <>
                <div className="dialog-div">
                  <img src={`/books-image/${getSelectedItem.productID}.jpg`}></img>
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
              <span onClick={() => setActiveImage(getSelectedItem)}>
                <ImageLoader
                  ProductID={getSelectedItem.productID}
                  Width={100}
                  Height={100}
                />
              </span>
                
            </div>
            <div className="product-item-context-container">
                  <span className="product-item-context-title">{getSelectedItem.name}</span>
                  <span className="product-item-context-categories">Categories: {getSelectedItem.type}</span>
                  <span className="product-item-context-tags">Tags: {getSelectedItem.type}</span>
                  <span className="product-item-context-prices">Prices: USD ${getSelectedItem.price}</span>
                  <div className="product-item-context-instructions">Description: <br/>{getSelectedItem.description}</div>

                  <div className="product-item-context-quantity-container">
                    <button className="product-item-context-quantity-subtract-button" onClick={handleSubtractChange}>-</button>
                    <span className="product-item-context-quantity-display">{quantity}</span>
                    <button className="product-item-context-quantity-add-button" onClick={handleAddChange}>+</button>
                  </div>

                  <AddToCartButton 
                      productID={getSelectedItem.productID}
                      name={getSelectedItem.name}
                      price={getSelectedItem.price}
                      quantity={quantity}
                  />
            </div>
          </div>
        </div>
        </>
        
      );
}

export default ProductItem;