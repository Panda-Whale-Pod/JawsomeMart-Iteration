import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as cartService from '../../services/cartService.js';
import './tailwind.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
                setError(error);
                setLoading(false);
            });
    }, [id]);

    const addProductToCart = () => {
        cartService.add({ id: product._id })
            .then(() => {
                alert('Item added to cart!');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading product: {error.message}</div>;
    }

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <div className="image-container">
                <img src={product.image} alt={product.title} />
            </div>
            <h4 className='text-bold'>
                ${product.price} USD
                <button className="button" onClick={addProductToCart}>
                    Add to Cart
                </button>
                Item Category: {product.category}
            </h4>
            <div className="description-box">
                About This Item: {product.description}
            </div>
            <div>
                {/*<h2>Recommended Products</h2>*/}
            </div>
        </div>
    );
}

export default ProductPage;
