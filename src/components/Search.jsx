import React, { useState } from 'react';

function SearchInput() {
  // const { btnSearchinput, setBtnSearchInput } = useState('');
  const [inputSearch, setInputSearch] = useState('');

  // function handleChange({ target }) {
  //   const valueSearch = target.value;
  //   setBtnSearchInput(valueSearch);

  function handleInputSearch({ target }) {
    const { value } = target;
    setInputSearch(value);
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
        />
      </label>

      <label htmlFor="name-search-radio">
        Name
        <input
          className="name-search-radio"
          data-testid="name-search-radio"
          type="radio"
          name="search-input"
        />
      </label>

      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          className="first-letter-search-radio"
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-input"
        />
      </label>

      <button type="submit" data-testid="exec-search-btn">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
