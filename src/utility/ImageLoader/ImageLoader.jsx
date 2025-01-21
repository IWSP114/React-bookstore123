import {useEffect, useState} from 'react'
import PropTypes from 'prop-types';

const ImageLoader = ({ProductID, Width, Height}) => {
  const [imageSrc, setImageSrc] = useState(null);

  const loadImage = async () => {
    const image = await import(`../../../src/assets/product/${ProductID}.jpg`);
    return image.default;
  };

  useEffect(() => {
    loadImage('myImage.png').then(setImageSrc);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return imageSrc ? <img src={imageSrc} alt="Dynamic Import" style={{
    height: Height+'%',
    width: Width+'%',
    objectFit: 'contain'
  }}/> : <p>Loading...</p>;
}
ImageLoader.propTypes = {
  ProductID: PropTypes.string.isRequired,
  Width: PropTypes.number.isRequired,
  Height: PropTypes.number.isRequired,
};

export default ImageLoader