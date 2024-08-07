/**
 * This file represents a marketplace page on our e-commerce website.
 * This page will render nested components such as listed items, navigation bar, and the shopping cart.
 * 
 * @returns - The components to be rendered
 * @exports Marketplace - Function to be used by other files
 */

// Importing necessary tools
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Product from './Product.jsx';
import { paginationFilter } from './helpers.jsx';
import Pagination from './Pagination.jsx';

// Importing CSS file
import './Marketplace.css';

// Defines our Marketplace function to be exported
const Marketplace = () => {
    
    // Creates state array to store Product components
    const [displayedProducts, setProducts] = useState([]);
    // Create state to keep track of the current page number
    const [currentPage, setCurrentPage] = useState(1);
    // Create state to keep track of posts per page
    const [postsPerPage, setPostsPerPage] = useState(6);

    // Creates a new array to hold all products returned from db
    // const allProducts = [];

    // Function that sends a "GET" request to the DB to fetch product data
    const getComponents = () => {

        // Sends a "GET" request for products stored in db
        axios.get('/api/products')
            .then(res => {

                // Function that changes the state of products array
                setProducts(() => {

                    // Saves the current array in newProducts
                    const newProducts = [];
                    const arr = res.data;
                    // Pushes product components to an array passing in data as props
                    for (let i = 0; i < arr.length; i++) {
                        const newProduct = (<Product
                            product_id={arr[i]._id}
                            id={arr[i].id}
                            title={arr[i].title}
                            price={arr[i].price} 
                            category={arr[i].category}
                            description={arr[i].description}
                            image={arr[i].image}
                            rating={arr[i].rating}
                        />);

                        // Pushes each product into allProducts array and displayedProducts arr
                        newProducts.push(newProduct);
                        // allProducts.push(newProducts);
                    }
                    return newProducts;
                });
            })

            // Catches any errors during our get request and displays a message box with the error
            .catch(e => {
                alert(e);
            })
    };


    // get components returns an array of newProducts
    // From this

    // Calls the getComponents function so we can render the products
    useEffect(() => {
        getComponents();
        // this getcomponents first updates displayedProducts- but now I'd like to 
        // have the state that this updates pass into a function which would filter the displayedProducts array
        // based on categories, then I will like that returned array to be passed through
        // another function that would change the displyaed products based on the paginated
        // parameters
        console.log("hit")
    }, []);

    const paginationFilteredProducts = useMemo(() => {
        return paginationFilter(displayedProducts, currentPage, postsPerPage);
    }, [displayedProducts, currentPage, postsPerPage])

    // Returns a styled div containing the rendered products
    return (
        <div className="product-display">

            {/* { displayedProducts } */}
            {paginationFilteredProducts}
            <Pagination
                displayedProducts={displayedProducts.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>

    );
};

// Exports the Marketplace function
export default Marketplace;