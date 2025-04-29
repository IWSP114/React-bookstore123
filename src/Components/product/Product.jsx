
import './Product.css';
import { useState, useEffect, memo } from "react"
import { Link } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
//import ImageLoader from '../../utility/ImageLoader/ImageLoader';
import axios from 'axios';

function Product() {
    const [data, setData] = useState([]); // State for storing fetched data
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling
    const [query, setQuery] = useState('');
    const [isListening, setIsListening] = useState(false);
    const cache = {};

    useEffect(() => {
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
  
    const commands = [
        {
            command: 'Do you have *',
            callback: (item) => setQuery(`${item}`)
        },
        {
            command: 'I want to find *',
            callback: (item) => setQuery(`${item}`)
        },
        {
            command: 'Can you find me a *',
            callback: (item) => setQuery(`${item}`)
        },
        {
            command: 'reset',
            callback: ({ resetTranscript }) => resetTranscript()
        }
    ];

    function handleListening() {
        if (!isListening) {
            SpeechRecognition.startListening({ continuous: true });
            setIsListening(true);
        } else {
            SpeechRecognition.stopListening();
            setIsListening(false);
        }
    }

    const { browserSupportsSpeechRecognition } = useSpeechRecognition({
        commands,
        onResult: (result) => {
          // This fires on every recognition result
          setQuery(result);
        }
      });

    if (!browserSupportsSpeechRecognition) {
        setQuery('Your browser does not support speech recognition');
    }
    if (loading) return <div>Loading...</div>; // Display loading state
    if (error) return <div>Error: {error}</div>; // Display error message

    const filteredData = data.filter(book =>
        book.name.toLowerCase().includes(query.toLowerCase()) || 
        book.type.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
    );
    
    return (
        <>
            <div className="product-container">
                <div className="product-tag-container">
                    <div className="product-tag-title-container">
                        <span>PRODUCT TAGS</span>
                    </div>
                    <div className="product-tag-context-container">
                        <div className="product-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Story Book</span></div>
                        <div className="product-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Literature</span></div>
                        <div className="product-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Historical</span></div>
                        <div className="product-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Finance</span></div>
                        <div className="product-tag-context"><span onClick={(e) => setQuery(e.target.innerText)}>Technological</span></div>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Something... / Supporting with voice input"
                        className="search-container"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="voice-input-container">
                        <button onClick={handleListening}>{!isListening ? 'Start' : 'Stop'}</button>
                        <button onClick={() => setQuery('')}>Reset</button>
                    </div>

                </div>
                <div className="product-display-container">
                    <div className="product-type-title-container">Products</div>
                    <div className="product-item-display-container">
                        {
                            filteredData.map((productItem)=>
                                    <div className="product-item-container-box" key={productItem.productID}>
                                        <Link to={`/product/${productItem.productID}`}>
                                            <div className="product-item-container">
                                                {!productItem.stock && <div className="out-of-stock-container">Out of Stock</div>}
                                                <div className="product-item-picture-container">
                                                    <img src={productItem.imageUrl} alt="Loading" style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        objectFit: 'contain'
                                                    }}/>
                                                </div>

                                                <div className="product-item-context-container">
                                                    <span className="product-item-context-type">{productItem.type}</span>
                                                    <span className="product-item-context-title">{productItem.name} by {productItem.author}</span>
                                                    <span className="product-item-context-price">USD ${productItem.price}</span>
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

export default memo(Product);