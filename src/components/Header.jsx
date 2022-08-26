import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, bool, nameBtn }) {
  const [searchDisabled, setSearchDisabled] = useState(true);

  const handleSearch = () => {
    setSearchDisabled(!searchDisabled);
  };

  return (
    <header>
      <div>
        <Link to="/profile">
          <button type="button">
            <img
              src={ icon }
              data-testid="profile-top-btn"
              alt="icone de perfil"
            />
          </button>
        </Link>
        {bool && (
          <button type="button" onClick={ handleSearch }>
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="icone de pesquisa"
            />
          </button>)}
        {!searchDisabled && (
          <SearchBar nameBtn={ nameBtn } />
        )}
      </div>
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

Header.propTypes = {
  bool: PropTypes.bool.isRequired,
  nameBtn: PropTypes.string,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  nameBtn: '',
};

export default Header;
