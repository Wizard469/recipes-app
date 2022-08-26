import PropTypes, { shape } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import categoryContext from '../context/CategoriesContex';

export default function DrinksCategories() {
  const { pathname } = useLocation();

  const [categoryName, setCategoryName] = useState([]);
  const {
    categoryDrinks,
  } = useContext(categoryContext);
  const num = 5;

  useEffect(() => {
    if (pathname === '/drinks') {
      const filteredCategoryMeals = categoryDrinks.slice(0, num);
      setCategoryName(filteredCategoryMeals);
    }
  }, [categoryDrinks]);

  useEffect(() => {}, [categoryName]);

  return (
    <div className="filter-container">
      {categoryName.length > 0 && categoryName.map((category, index) => (
        <button
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index }
          onClick={ () => {} }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

DrinksCategories.propTypes = {
  history: PropTypes.shape({ location: shape({}) }).isRequired,
};
