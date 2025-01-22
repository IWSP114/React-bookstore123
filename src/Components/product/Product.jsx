
import './Product.css';
import { useContext, memo } from "react"
import { ProductContext } from "../../utility/CartLoader";
import { Link } from 'react-router-dom';
import ImageLoader from '../../utility/ImageLoader/ImageLoader';

function Product() {
    const { products,  } = useContext(ProductContext);
    
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
                        products.map((productItem)=>
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