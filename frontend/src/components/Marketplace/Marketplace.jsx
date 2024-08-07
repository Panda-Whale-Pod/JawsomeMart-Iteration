/**
 * This file represents a marketplace page on our e-commerce website.
 * This page will render nested components such as listed items, navigation bar, and the shopping cart.
 *
 * @returns - The components to be rendered
 * @exports Marketplace - Function to be used by other files
 */

// Importing necessary tools
import { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product.jsx';

// Importing CSS file
import './Marketplace.css';

// Defines our Marketplace function to be exported
const Marketplace = () => {
  // Creates state array to store Product components
  const [displayedProducts, setProducts] = useState([]);

  // Creates a new array to hold all products returned from db
  // const allProducts = [];

  // Function that sends a "GET" request to the DB to fetch product data
  const getComponents = () => {
    // Sends a "GET" request for products stored in db
    axios
      .get('/api/products')
      .then((res) => {
        // Function that changes the state of products array
        setProducts(() => {
          // Saves the current array in newProducts
          const newProducts = [];
          const arr = res.data;
          console.log('arr: ', arr);
          // Pushes product components to an array passing in data as props
          for (let i = 0; i < arr.length; i++) {
            const newProduct = (
              <Product
                product_id={arr[i]._id}
                id={arr[i].id}
                title={arr[i].title}
                price={arr[i].price}
                category={arr[i].category}
                description={arr[i].description}
                image={arr[i].image}
                rating={arr[i].rating}
              />
            );

            // Pushes each product into allProducts array and displayedProducts arr
            newProducts.push(newProduct);
            // allProducts.push(newProducts);
          }
          return newProducts;
        });
      })

      // Catches any errors during our get request and displays a message box with the error
      .catch((e) => {
        alert(e);
      });
  };

  // Calls the getComponents function so we can render the products
  useEffect(() => {
    getComponents();
    console.log('hit');
  }, []);

  const categoryTitles = [
    'clothes',
    'shoes',
    'jewelry',
    'electronics',
    'miscellaneous',
    'furniture',
  ];

  const categoryButtons = categoryTitles.map((category, index) => {
    return (
      <button className='categoryButton' key={index}>
        {category}
      </button>
    );
  });

  const pages = ['1', '2', '3', '4'];

  const pageNumbers = pages.map((page, index) => {
    return (
      <button className='pageNumberButton' key={index}>
        {page}
      </button>
    );
  });
  // Returns a styled div containing the rendered products
  return (
    <div className='marketplace'>
      <div className='searchBar'>
        <input className='searchInput' type='text' placeholder='search'></input>
        <button type='submit'>Submit</button>
      </div>
      <div className='mainBox'>
        <div>
          <div className='categories'>{categoryButtons}</div>
        </div>
        <div className='innerBox'>
          <div className='product-display'>{displayedProducts}</div>
          <div className='pagination'>{pageNumbers}</div>
        </div>
      </div>
    </div>
  );
};

// Exports the Marketplace function
export default Marketplace;
