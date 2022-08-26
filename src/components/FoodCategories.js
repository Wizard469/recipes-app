import PropTypes, { shape } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import categoryContext from '../context/CategoriesContex';

export default function FoodCategories() {
  const { pathname } = useLocation();

  const [categoryName, setCategoryName] = useState([]);
  const {
    categoryMeals,
  } = useContext(categoryContext);
  const num = 5;

  useEffect(() => {
    if (pathname === '/foods') {
      const filteredCategoryMeals = categoryMeals.slice(0, num);
      setCategoryName(filteredCategoryMeals);
    }
  }, [categoryMeals]);

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

FoodCategories.propTypes = {
  history: PropTypes.shape({ location: shape({}) }).isRequired,
};
