import { useEffect, useState } from "react"
import './popularItem.css'
//import ImageLoader from "../../../utility/ImageLoader/ImageLoader"
import { Link } from 'react-router-dom';
import axios from "axios";
import ToTwoDecimal from "../../../utility/ToTwoDecimal";

function PopularItem() {
  const [data, setData] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getProduct`); // Replace with your API endpoint
            setData(response.data.Products); // Update state with fetched data

        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    fetchData(); 
  }, []); 

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message
  
  return (
    <div className="popular-items-background">
      <div className="popular-items-title-container">
        <span className="popular-items-title">&#128293; Popular Items &#128293;</span>
      </div>
      
      <div className="popular-items-box-container">
        {
          data.slice(0, 5).map((product)=>
            
              <div className="popular-item-container" key={product.productID}>
                <Link to={`/product/${product.productID}`} >
                  <div className="popular-item-image-container">
                  <img src={product.imageUrl} alt="Loading" style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain'
                  }}/>
                  </div>

                  <div className="popular-item-name-container">
                    <span>{product.name} by {product.author}</span>
                  </div>

                  <div className="popular-item-price-container">
                    <span>USD ${ToTwoDecimal(product.price)}</span>
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