import PropTypes, { shape } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import categoryContext from '../context/CategoriesContex';
import context from '../context/Context';
import { drinkByCategory } from '../services/api';

export default function DrinksCategories() {
  const { pathname } = useLocation();

  const [categoryName, setCategoryName] = useState([]);
  const {
    categoryDrinks,
  } = useContext(categoryContext);
  const { recipesChange, setAllButton } = useContext(context);
  const num = 5;

  useEffect(() => {
    if (pathname === '/drinks') {
      const filteredCategoryMeals = categoryDrinks.slice(0, num);
      setCategoryName(filteredCategoryMeals);
    }
  }, [categoryDrinks]);

  useEffect(() => {}, [categoryName]);

  const handleClick = async ({ target }) => {
    const { value } = target;
    const drinks = await drinkByCategory(value);
    recipesChange(drinks);
  };

  const AllCategories = async () => {
    const fetchApi = async () => {
      const resp = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      );
      const json = await resp.json();
      recipesChange(json);
      setAllButton(json);
    };
    fetchApi();
  };

  return (
    <div className="filter-container">
      {categoryName.length > 0 && categoryName.map((category, index) => (
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
      <button
        type="button"
        data-testid="All-category-filter"
        value="teste"
        onClick={ AllCategories }
      >
        All
      </button>
    </div>
  );
}

DrinksCategories.propTypes = {
  history: PropTypes.shape({ location: shape({}) }).isRequired,
};
