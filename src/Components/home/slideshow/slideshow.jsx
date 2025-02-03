import { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
import './slideshow.css';
import axios from 'axios';


const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState([]); // State for storing fetched data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getProduct`); // Replace with your API endpoint
            setData((response.data.Products).slice(0, 5)); // Update state with fetched data

        } catch (error) {
            setError(error.message); 
        } finally {
            setLoading(false); 
        }
    };

    fetchData(); 
  }, []); 

  const goToNextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  const goToSelectSlide = (index) => {
      setCurrentIndex(index);
  };

  useEffect(() => {
    let slideAuto;
    if(!loading) {
      slideAuto = setInterval(() => {
        goToNextSlide()
      }, 8000);
    }
  
    return () => {
      clearInterval(slideAuto);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  if (loading) return <div>Loading...</div>; // Display loading state
  if (error) return <div>Error: {error}</div>; // Display error message

  return (
      <div className="slideshow-container">
          {data.map((slide, index) => (
              <div
                  key={index}
                  className={`slide ${index === currentIndex ? 'active' : ''}`}
              >
                <img src={slide.imageUrl} className="slide-image"/>
              </div>
          ))}
          <button onClick={goToPrevSlide} className="go-to-prev-slide-button">&#10132;</button>
          <button onClick={goToNextSlide} className="go-to-next-slide-button">&#10132;</button>

          <div className="slideshow-page-container">
            {data.map((slide, index)=> 
              <button key={index} onClick={() => goToSelectSlide(index)} className={`slideshow-page-button ${index === currentIndex ? 'active' : ''}`}></button>
            )}
          </div>
      </div>
  );
};


export default Slideshow;