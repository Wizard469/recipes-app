import { node } from 'prop-types';
import React, { useEffect, useState } from 'react';
import categoryContext from './CategoriesContext';

function CategoryProvider({ children }) {
  const endpointMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const endpointDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrinks, setCategoryDrinks] = useState([]);
  const [filteredByCategory, setFilteredByCategory] = useState([]);

  useEffect(() => {
    const getCategoryMeals = async () => {
      const response = await fetch(endpointMeals);
      const resultsMeals = await response.json();
      const { meals } = resultsMeals;
      setCategoryMeals(meals);
    };
    getCategoryMeals();
    const getCategoryDrinks = async () => {
      const response = await fetch(endpointDrinks);
      const resultsDrinks = await response.json();
      const { drinks } = resultsDrinks;
      setCategoryDrinks(drinks);
    };
    getCategoryDrinks();
  }, []);

  const contextValue = {
    categoryMeals,
    categoryDrinks,
    filteredByCategory,
    setFilteredByCategory,
  };
  return (
    <categoryContext.Provider value={ contextValue }>
      {children}
    </categoryContext.Provider>
  );
}

CategoryProvider.propTypes = {
  children: node,
}.isRequired;

export default CategoryProvider;
