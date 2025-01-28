
import './Product.css';
import { useState, useEffect, memo } from "react"
import { Link } from 'react-router-dom';
import ImageLoader from '../../utility/ImageLoader/ImageLoader';
import axios from 'axios';

function Product() {
    const [data, setData] = useState([]); // State for storing fetched data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getProduct`); // Replace with your API endpoint
                setData(response.data.Products); // Update state with fetched data
                console.log(response.data.Products);
    
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
        <>
            <div className="product-container">
                <div className="product-tag-container">
                    <div className="product-tag-title-container">
                        <span>PRODUCT TAGS</span>
                    </div>
                    <div className="product-tag-context-container">
                        <div className="product-tag-context">Story Book</div>
                        <div className="product-tag-context">Literature</div>
                        <div className="product-tag-context">History</div>
                        <div className="product-tag-context">Finance</div>
                        <div className="product-tag-context">Technological</div>
                    </div>
                    
                </div>
                <div className="product-display-container">
                    {
                        data.map((productItem)=>
                                <div className="product-item-container-box" key={productItem.productID}>
                                    <Link to={`/product/${productItem.productID}`}>
                                        <div className="product-item-container">
                                            <div className="product-item-picture-container">
                                                <ImageLoader
                                                    ProductID={productItem.productID}
                                                    Width={100}
                                                    Height={100}
                                                />
                                            </div>

                                            <div className="product-item-context-container">
                                                <span className="product-item-context-type">Story Book</span>
                                                <span className="product-item-context-title">{productItem.name}</span>
                                                <span className="product-item-context-price">USD ${productItem.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                        )
                    }
                </div>
                
                
            </div>
        </>
    );
}

export default memo(Product);