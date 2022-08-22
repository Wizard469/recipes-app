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
      <div>
        <input
          type="text"
          value={ inputSearch }
          data-testid="search-input"
          placeholder="Digite sua busca"
          onChange={ (event) => handleInputSearch(event) }
        />
      </div>
    </form>
  );
}

export default SearchInput;
