import { useState } from 'react';
import PropTypes from 'prop-types';
import './slideshow.css';


const Slideshow = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
      setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const goToPrevSlide = () => {
      setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const goToSelectSlide = (index) => {
      setCurrentIndex(index);
      console.log('trigger');
  };

  return (
      <div className="slideshow-container">
          {slides.map((slide, index) => (
              <div
                  key={index}
                  className={`slide ${index === currentIndex ? 'active' : ''}`}
              >
                <img src={slide} className="slide-image"/>
              </div>
          ))}
          <button onClick={goToPrevSlide} className="go-to-prev-slide-button">&#10132;</button>
          <button onClick={goToNextSlide} className="go-to-next-slide-button">&#10132;</button>

          <div className="slideshow-page-container">
            {slides.map((slide, index)=> 
              <button key={index} onClick={() => goToSelectSlide(index)} className={`slideshow-page-button ${index === currentIndex ? 'active' : ''}`}></button>
            )}
          </div>
      </div>
  );
};

Slideshow.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Slideshow;