import PropTypes, { shape } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import categoryContext from '../context/CategoriesContex';
import context from '../context/Context';
import { foodByCategory } from '../services/api';

export default function FoodCategories() {
  const { pathname } = useLocation();

  const [categoryName, setCategoryName] = useState([]);
  const {
    categoryMeals,
  } = useContext(categoryContext);
  const { recipesChange, setAllButton } = useContext(context);
  const num = 5;

  useEffect(() => {
    if (pathname === '/foods') {
      const filteredCategoryMeals = categoryMeals.slice(0, num);
      setCategoryName(filteredCategoryMeals);
    }
  }, [categoryMeals]);

  useEffect(() => {}, [categoryName]);

  const handleClick = async ({ target }) => {
    const { value } = target;
    const meals = await foodByCategory(value);
    recipesChange(meals);
  };

  const AllCategories = async () => {
    const fetchApi = async () => {
      const resp = await fetch(
        `https://www.the${
          pathname ? 'meal' : 'cocktail'
        }db.com/api/json/v1/1/search.php?s=`,
      );
      const json = await resp.json();
      recipesChange(json);
      setAllButton(json);
    };
    fetchApi();
  };
  return (
    <div className="filter-container">
      <button
        type="button"
        data-testid="All-category-filter"
        value="teste"
        onClick={ AllCategories }
      >
        All
      </button>
      {categoryName && categoryName.map((category, index) => (
        <button
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          key={ index }
          value={ category.strCategory }
          onClick={ handleClick }
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
