
import './wishList.css';
import { useState, useEffect, memo, useMemo } from "react"
import { useCookies } from 'react-cookie';
import { decryptData } from '../../utility/crypto';
import { Link } from 'react-router-dom';
import useAuthRedirect from '../../utility/useAuthRedirect';
import axios from 'axios';

function WishList() {
    const [data, setData] = useState([]); // State for storing fetched data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    const [query, setQuery] = useState('');
    const [cookies] = useCookies(['user']);
    const { loadingAuth } = useAuthRedirect();
    const cache = {};

    const userIDCookie = useMemo(() => {
      return cookies.user ? decryptData(cookies.user).id : undefined;
    }, [cookies.user]);

    useEffect(() => {
        const cacheKey = 'wish-lists'; // Define a unique key for caching

        if (cache[cacheKey]) {
            // If data is already cached, use it
            setData(cache[cacheKey]);
            setLoading(false);
            return;
        }
        
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/get-all-wish-list/${userIDCookie}`); // Replace with your API endpoint
                setData(response.data.products); // Update state with fetched data
                console.log(response.data.products);
                cache[cacheKey] = response.data.products;
    
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
        book.productID.toLowerCase().includes(query.toLowerCase()) || 
        book.productAuthor.toLowerCase().includes(query.toLowerCase()) ||
        book.productType.toLowerCase().includes(query.toLowerCase())
    );
    
    return (
        <>
            <div className="wish-list-container">
                <div className="wish-list-tag-container">
                    <div className="wish-list-tag-title-container">
                        <span>Product TAGS</span>
                    </div>
                    <div className="wish-list-tag-context-container">
                        <div className="wish-list-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Story Book</span></div>
                        <div className="wish-list-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Literature</span></div>
                        <div className="wish-list-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Historical</span></div>
                        <div className="wish-list-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Finance</span></div>
                        <div className="wish-list-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Technological</span></div>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Something..."
                        className="search-container"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="wish-list-display-container">
                    <div className="wish-list-type-title-container">Wish list</div>

                    <div className="wish-list-item-display-container">
                        {
                            filteredData.map((wishlistItem)=>
                                    <div className="wish-list-item-container-box" key={wishlistItem.productID}>
                                        <Link to={`/product/${wishlistItem.productID}`}>
                                            <div className="wish-list-item-container">
                                                {!wishlistItem.productStock && <div className="out-of-stock-container">Out of Stock</div>}
                                                <div className="wish-list-item-picture-container">
                                                    <img src={wishlistItem.imageUrl} alt="Loading" style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        objectFit: 'contain'
                                                    }}/>
                                                </div>

                                                <div className="wish-list-item-context-container">
                                                    <span className="wish-list-item-context-type">{wishlistItem.type}</span>
                                                    <span className="wish-list-item-context-title">{wishlistItem.productName} by {wishlistItem.productAuthor}</span>
                                                    <span className="wish-list-item-context-price">USD ${wishlistItem.productPrice}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                            )
                        }
                    </div>
                </div>

                
                
                
            </div>
        </>
    );
}

export default memo(WishList);