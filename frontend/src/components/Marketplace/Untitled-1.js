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
import Categories from './Categories.jsx';

// Importing CSS file
import './Marketplace.css';

// Defines our Marketplace function to be exported
const Marketplace = () => {
  // Creates state array to store Product components
  const [displayedProducts, setProducts] = useState([]);
  const [arrayOfProducts, setArrayOfProducts] = useState([]);
  const [chosenCategory, setChosenCategory] = useState('');

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

  useEffect(() => {
    if (chosenCategory !== '') {
      const arr = [];
      for (let i = 0; i < arrayOfProducts.length; i++) {
        if (arrayOfProducts[i].category === chosenCategory) {
          arr.push(arrayOfProducts[i]);
        }
      }
      displayMarketProducts(arr);
    }
  }, [chosenCategory]);

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

  const pages = ['1', '2', '3', '4'];

  const pageNumbers = pages.map((page, index) => {
    return (
      <button className='pageNumberButton' key={index}>
        {page}
      </button>
    );
  });

  const categoryClickHandler = (e) => {
    setChosenCategory(e.target.id);
  };

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
          <div className='product-display'>{displayedProducts}</div>
          <div className='pagination'>{pageNumbers}</div>
        </div>
      </div>
    </div>
  );
};

// Exports the Marketplace function
export default Marketplace;
