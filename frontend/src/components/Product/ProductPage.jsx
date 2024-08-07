// Importing required dependencies
import * as cartService from '../../services/cartService.js';

// Importing TailwindCSS file
import './tailwind.css';

const ProductPage = (props) => {
    const objID = props.product_id;
    // Function that allows users to add an item to their cart
    const addProductToCart = () => {

        // Calls imported function, passing in Object ID
        cartService.add({id: objID})
            .then(() => {  
                alert('Item added to cart!');
            })
    }

    return (
        <div>
            <h1>
                {props.title}
            </h1>


            <div className="image-container">            
                <img src={props.image}/>
            </div>

            <h4 className='text-bold'>
                ${props.price} USD
                <button onClick={ addProductToCart }>
                    Add to Cart
                </button>
                Item Category: { props.category }
            </h4>

            <div className="description-box">
                About This Item: {props.description}
            </div>

            <div>
                <h2>Recommended Products</h2>
            </div>
        </div>
    )
}

export default ProductPage; 