import { useContext } from "react"
import { ProductContext } from "../../../utility/CartLoader"
import './popularItem.css'
import ImageLoader from "../../../utility/ImageLoader/ImageLoader"
import { Link } from 'react-router-dom';

function PopularItem() {
  const { products,  } = useContext(ProductContext);

  return (
    <div className="popular-items-background">
      <div className="popular-items-title-container">
        <span className="popular-items-title">&#128293; Popular Items &#128293;</span>
      </div>
      
      <div className="popular-items-box-container">
        {
          products.slice(0, 5).map((product)=>
            
              <div className="popular-item-container" key={product.productID}>
                <Link to={`/product/${product.productID}`} >
                  <div className="popular-item-image-container">
                    <ImageLoader
                      ProductID={product.productID}
                      Width={100}
                      Height={100}
                    />
                  </div>

                  <div className="popular-item-name-container">
                    <span>{product.name}</span>
                  </div>

                  <div className="popular-item-price-container">
                    <span>USD ${product.price}</span>
                  </div>
                </Link>
              </div>
           
          )
        }

        

      </div>
    </div>
    
  )
}
export default PopularItem