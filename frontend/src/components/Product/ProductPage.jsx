// Importing required dependencies
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as cartService from '../../services/cartService.js';
// Importing TailwindCSS file
import './tailwind.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch the product data from the server using the id
        fetch(`/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProduct(data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    // Function that allows users to add an item to their cart
    const addProductToCart = () => {
        // Calls imported function, passing in Object ID
        cartService.add({ id: product.id })
            .then(() => {
                alert('Item added to cart!');
            });
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <div className="image-container">
                <img src={product.image} alt={product.title} />
            </div>
            <h4 className='text-bold'>
                ${product.price} USD
                <button onClick={addProductToCart}>
                    Add to Cart
                </button>
                Item Category: {product.category}
            </h4>
            <div className="description-box">
                About This Item: {product.description}
            </div>
            <div>
                <h2>Recommended Products</h2>
            </div>
        </div>
    );
}

export default ProductPage;
