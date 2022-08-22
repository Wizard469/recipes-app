import React, { useState } from 'react';

function SearchInput() {
  // const { btnSearchinput, setBtnSearchInput } = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [ingredient, setIngredient] = useState(false);
  const [name, setName] = useState(false);
  const [firstLetter, setFirstLetter] = useState(false);

  // function handleChange({ target }) {
  //   const valueSearch = target.value;
  //   setBtnSearchInput(valueSearch);

  function handleInputSearch({ target }) {
    const { value } = target;
    setInputSearch(value);
  }

  function handleChangeIngredient() {
    setIngredient(true);
  }

  function handleChangeName() {
    setName(true);
  }

  function handleChangeFirst() {
    setFirstLetter(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (ingredient === true) {
      if (inputSearch === 'chicken') {
        const url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken';
        const response = await fetch(url);
        const json = await response.json();
        return json;
      }
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i={${inputSearch}}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    }

    if (name === true) {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      const response = await fetch(url);
      const json = await response.json();
      return json;
    }

    if (firstLetter === true) {
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
          value={ ingredient }
          onChange={ handleChangeIngredient }
        />
      </label>

      <label htmlFor="name-search-radio">
        Name
        <input
          className="name-search-radio"
          data-testid="name-search-radio"
          type="radio"
          name="search-input"
          value={ name }
          onChange={ handleChangeName }
        />
      </label>

      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          className="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-input"
          value={ firstLetter }
          onChange={ handleChangeFirst }
        />
      </label>

      <button onClick={ handleSubmit } type="submit" data-testid="exec-search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
