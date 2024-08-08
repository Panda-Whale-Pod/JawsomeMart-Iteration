// import { useState, useEffect } from 'react';

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
        className='categoryButton'
        id={category}
        key={index}
        onClick={categoryClickHandler}
      >
        {category}
      </button>
    );
  });

  return <div>{categories}</div>;
};

export default Categories;
