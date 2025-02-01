import { useState } from 'react';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImgUrl, setPreviewImgUrl] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewImgUrl(objectUrl);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the upload logic here (e.g., send the image to a server)
        console.log('Uploading:', selectedImage);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                />
                <button type="submit" disabled={!selectedImage}>
                    Upload Image
                </button>
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

export default ImageUpload;