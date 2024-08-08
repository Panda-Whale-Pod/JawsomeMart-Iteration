import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as cartService from '../../services/cartService.js';
// import './tailwind.css';
import styles from './ProductPage.module.css';

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
        <div className={styles.productContainer}>
            <h1 className='text-bold'>{product.title}</h1>
            <hr></hr>
            <div className={styles.imageTextContainer}>
                <img src={product.image} alt={product.title} />
            </div>
            <hr></hr>
            <h4 className={styles.textBold}>
                ${product.price} USD
                <button className={styles.button} onClick={addProductToCart}>
                    Add to Cart
                </button>
                <div className={styles.descriptionBox}><strong>Item Category:</strong></div>
                <div className={styles.descriptionBox}>{product.category}</div>
            </h4>
            <hr></hr>
            <div className={styles.descriptionBox}>
                About This Item: 
            </div>
            <div className={styles.descriptionBox}>{product.description}</div>
            <div>
                {/*<h2>Recommended Products</h2>*/}
            </div>
        </div>
    );
};

export default ProductPage;
