// import { useState, useEffect } from 'react';

import styles from './Marketplace.module.css';

const Categories = (props) => {
  const { categoryClickHandler } = props;
  const categoryTitles = [
    'clothes',
    'shoes',
    'jewelry',
    'electronics',
    'miscellaneous',
    'furniture',
  ];
  const categories = categoryTitles.map((category, index) => {
    return (
      <button
        className={styles.categoryButton}
        id={category}
        key={index}
        onClick={categoryClickHandler}
      >
        {category}
      </button>
    );
  });

  return <div className={styles.categories}>{categories}</div>;
};

export default Categories;
