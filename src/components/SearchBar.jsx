import { shape, string, func } from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SearchBar() {
  const [inputSearch, setInputSearch] = useState('');
  const history = useHistory();

  // Estados para controlar os input-radios
  // const [ingredient, setIngredient] = useState(false);
  // const [name, setName] = useState(false);
  // const [firstLetter, setFirstLetter] = useState(false);
  const [toggleOptions, setToggleOptions] = useState('');

  function handleInputSearch({ target: { value } }) {
    setInputSearch(value);
  }

  // Funções para alterar o estados dos input-radios
  // function handleChangeIngredient() {
  //   setIngredient(true);
  // }

  // function handleChangeName() {
  //   setName(true);
  // }

  // function handleChangeFirst() {
  //   setFirstLetter(true);
  // }

  function handleToggleState(e) {
    setToggleOptions(e.target.value);
  }

  // Função que faz a requisição das foods
  async function requestFoods() {
    if (toggleOptions === 'ingredient') {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    }

    if (toggleOptions === 'name') {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    }

    if (toggleOptions === 'first-letter') {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
      }
    }
  }

  // Função que faz a requisição das drinks
  async function requestDrinks() {
    if (toggleOptions === 'ingredient') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    }

    if (toggleOptions === 'name') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    }

    if (toggleOptions === 'first-letter') {
      if (inputSearch.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`;
        const response = await fetch(url);
        const json = await response.json();
        return json;
      }
    }
  }

  // Função submit para realizar o fetch das api's
  async function handleSubmit(e) {
    e.preventDefault();
    const { location: { pathname } } = history;

    if (pathname === '/foods') {
      const response = await requestFoods();

      if (response && response.meals.length === 1) {
        history.push(`/foods/${response.meals[0].idMeal}`);
      }
    } else if (pathname === '/drinks') {
      const response = await requestDrinks();

      if (response && response.drinks.length === 1) {
        history.push(`/drinks/${response.drinks[0].idDrink}`);
      }
    }
  }

  return (
    <form>
      <label htmlFor="search-input">
        <input
          className="search-input"
          type="text"
          value={ inputSearch }
          data-testid="search-input"
          placeholder="Digite sua busca"
          onChange={ (event) => handleInputSearch(event) }
        />
      </label>

      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          className="ingredient-search-radio"
          data-testid="ingredient-search-radio"
          type="radio"
          name="search-input"
          value="ingredient"
          onChange={ handleToggleState }
        />
      </label>

      <label htmlFor="name-search-radio">
        Name
        <input
          className="name-search-radio"
          data-testid="name-search-radio"
          type="radio"
          name="search-input"
          value="name"
          onChange={ handleToggleState }
        />
      </label>

      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          className="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-input"
          value="first-letter"
          onChange={ handleToggleState }
        />
      </label>

      <button onClick={ handleSubmit } type="submit" data-testid="exec-search-btn">
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  history: shape({
    location: string,
    push: func,
  }),
}.isRequired;

export default SearchBar;
