
import './productController.css';
import { useState, useEffect, memo } from "react"
import { Link, useNavigate } from 'react-router-dom';
//import ImageLoader from '../../utility/ImageLoader/ImageLoader';
import axios from 'axios';
import useAuthRedirect from '../../utility/useAuthRedirect';

function ProductController() {
    const navigate = useNavigate();
    const { identity, loadingAuth } = useAuthRedirect();
    const [data, setData] = useState([]); // State for storing fetched data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    const [query, setQuery] = useState('');
    const cache = {};

    async function handleDeleteItem (productID) {
        const productData = { productID: productID };
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}api/delete-from-products`, {
              data: productData // Correctly send the data here
          });

            if(response.status === 200 && response.data.message === 'Success!') {
              console.log("Success!");
              setData(data.filter((item) => item.productID !== productID))
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
        }
    }

    useEffect(() => {
        if(identity !== 'staff' && !loadingAuth) {
            return navigate('/', { replace: true });
        }
        const cacheKey = 'products'; // Define a unique key for caching

        if (cache[cacheKey]) {
            // If data is already cached, use it
            setData(cache[cacheKey]);
            setLoading(false);
            return;
        }
        
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}getProduct`); 
                setData(response.data.Products); // Update state with fetched data
                console.log(response.data.Products);
                cache[cacheKey] = response.data.Products;
    
            } catch (error) {
                setError(error.message); 
            } finally {
                setLoading(false); 
            }
        };
    
        fetchData(); 
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); 

    if (loadingAuth) return <div>Loading...</div>; // Display loading state
    if (loading) return <div>Loading...</div>; // Display loading state
    if (error) return <div>Error: {error}</div>; // Display error message

    const filteredData = data.filter(book =>
        book.name.toLowerCase().includes(query.toLowerCase()) || 
        book.type.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    
    return (
        <>
            <div className="product-controller-container">
                <div className="product-controller-tag-container">
                    <div className="product-controller-tag-title-container">
                        <span>Product TAGS</span>
                    </div>
                    <div className="product-controller-tag-context-container">
                        <div className="product-controller-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Story Book</span></div>
                        <div className="product-controller-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Literature</span></div>
                        <div className="product-controller-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Historical</span></div>
                        <div className="product-controller-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Finance</span></div>
                        <div className="product-controller-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Technological</span></div>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Something..."
                        className="search-container"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="product-controller-display-container">
                    <div className="product-controller-type-title-container">Products Controller</div>
                    <div className="product-controller-item-display-container">
                        {
                            filteredData.map((productItem)=>
                                    <div className="product-controller-item-container-box" key={productItem.productID}>
                                        <Link to={`/product/${productItem.productID}`}>
                                            <div className="product-controller-item-container">
                                                {!productItem.stock && <div className="out-of-stock-container">Out of Stock</div>}
                                                <div className="product-controller-item-picture-container">
                                                    <img src={productItem.imageUrl} alt="Loading" style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        objectFit: 'contain'
                                                    }}/>
                                                </div>

                                                <div className="product-controller-item-context-container">
                                                    <span className="product-controller-item-context-type">{productItem.type}</span>
                                                    <span className="product-controller-item-context-title">{productItem.name} by {productItem.author}</span>
                                                    <span className="product-controller-item-context-price">USD ${productItem.price}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="product-option-container">
                                            <div className="product-option-revise"><Link to={`/staff/products-edit/${productItem.productID}`}>REVISE</Link></div>
                                            <div className="product-option-delete" onClick={() => handleDeleteItem(productItem.productID)}>DELETE</div>
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                </div>

                
                
                
            </div>
        </>
    );
}

export default memo(ProductController);