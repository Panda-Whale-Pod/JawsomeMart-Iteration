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
import Categories from './Categories.jsx';
import { paginationFilter } from './helpers.jsx';
import Pagination from './Pagination.jsx';

// Importing CSS file
import './Marketplace.css';

// Defines our Marketplace function to be exported
const Marketplace = () => {
  // Creates state array to store Product components
  const [displayedProducts, setProducts] = useState([]);
  const [arrayOfProducts, setArrayOfProducts] = useState([]);
  const [chosenCategory, setChosenCategory] = useState('');
  // Create state to keep track of the current page number
  const [currentPage, setCurrentPage] = useState(1);
  // Create state to keep track of posts per page
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => {
        setArrayOfProducts(res.data);
        displayMarketProducts(res.data);
      })
      .catch((e) => {
        alert(e);
      });
  }, []);

  const displayMarketProducts = (arr) => {
    const newProducts = [];
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
      newProducts.push(newProduct);
    }
    setProducts(newProducts);
  };

  const categoryClickHandler = (e) => {
    setChosenCategory(e.target.id);
    setCurrentPage(1);
    let newCategory = e.target.id;
    const arr = [];
    for (let i = 0; i < arrayOfProducts.length; i++) {
      if (arrayOfProducts[i].category === newCategory) {
        arr.push(arrayOfProducts[i]);
      }
    }
    displayMarketProducts(arr);
  };

  const paginationFilteredProducts = useMemo(() => {
    return paginationFilter(displayedProducts, currentPage, postsPerPage);
  }, [displayedProducts, currentPage, postsPerPage])

  // Returns a styled div containing the rendered products
  return (
    <div className='marketplace'>
      <div className='searchBar'>
        <input className='searchInput' type='text' placeholder='search'></input>
        <button type='submit'>Submit</button>
      </div>
      <div className='mainBox'>
        <div>
          <Categories
            className='categories'
            categoryClickHandler={categoryClickHandler}
          />
        </div>
        <div className='innerBox'>
          {/* <div className='product-display'>{displayedProducts}</div> */}
          <div className='product-display'>{paginationFilteredProducts}</div>
          <Pagination
            displayedProducts={displayedProducts.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

// Exports the Marketplace function
export default Marketplace;
