import { useState } from 'react';
import './createProductForm.css';
import axios from 'axios';

const UploadForm = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImgUrl, setPreviewImgUrl] = useState('');

    const [productName, setProductName] = useState("");
    const [productAuthor, setProductAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [producType, setProductType] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productStock, setProductStock] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewImgUrl(objectUrl);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('productName', productName);
        formData.append('productAuthor', productAuthor);
        formData.append('description', description);
        formData.append('producType', producType);
        formData.append('productPrice', productPrice);
        formData.append('productStock', productStock);

        try {
            const response = await axios.post('http://localhost:5000/create-product', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

            if(response.status === 200 && response.data.message === "Your product created successfully!") {
                console.log(response.data.message);
            } 
        } catch (error) {
            // Suppress default error logging
            if (error.response) {
                // Handle known errors from server responses
                setErrorMessage(error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                setErrorMessage('No response received from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setErrorMessage('An error occurred while making the request.');
            }
            // Clear input fields after an error
        } finally {
            setProductAuthor("");
            setProductName("");
            setDescription("");
            setProductType("");
            setProductPrice(0);
            setProductStock(0);
        }
        
        console.log('Uploading:', selectedImage);
    };

    return (
        <div className="create-product-form">
          <h2>Create a new product</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                  <label htmlFor="product-name">Product Name:</label>
                  <input type="text" id="product-name" name="product-name" onChange={(e) => setProductName(e.target.value)} value={productName} required/>
              </div>

              <div className="form-group">
                  <label htmlFor="product-author">Product Author:</label>
                  <input type="text" id="product-author" name="product-author" onChange={(e) => setProductAuthor(e.target.value)} value={productAuthor} required/>
              </div>

              <div className="form-group">
                  <label htmlFor="description">Description:</label>
                  <textarea type="text" id="description" name="description" className="description" onChange={(e) => setDescription(e.target.value)} value={description} required/>
              </div>

              <div className="form-group">
                  <label htmlFor="product-type">Product Type:</label>
                  <input type="text" id="product-type" name="product-type" onChange={(e) => setProductType(e.target.value)} value={producType} required/>
              </div>

              <div className="form-group">
                  <label htmlFor="product-price">Price:</label>
                  <input type="number" id="product-price" name="product-price" min="0" max="1000" step="0.01" className="product-price" onChange={(e) => setProductPrice(e.target.value)} value={productPrice} required/>
              </div>

              <div className="form-group">
                  <label htmlFor="product-stock">Stock:</label>
                  <input type="number" id="product-stock" name="product-stock" min="0" max="1000" className="product-stock" onChange={(e) => setProductStock(e.target.value)} value={productStock} required/>
              </div>

              <div className="form-group">
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                />
                <button type="submit" className="image-button" disabled={!selectedImage}>
                    Upload Image
                </button>
              </div>
              <span className="error-message">{errorMessage}</span>
            </form>
            {previewImgUrl && (
                <div>
                    <h3>Image Preview:</h3>
                    <img src={previewImgUrl} alt="Preview" style={{ width: '200px', height: 'auto' }} />
                </div>
            )}
        </div>
    );
};

export default UploadForm;