import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header(props) {
  const { history, pageTitle, showSearch } = props;
  const [search, setSearch] = useState(false);

  return (
    <div>
      <div className="profile-icon-container">
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="imagem profile"
          />
        </Link>
      </div>
      <br />
      {showSearch ? (
        <div className="search-icon-container">
          <input
            type="image"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="imagem"
            onClick={ () => setSearch((prevState) => !prevState) }
          />
        </div>) : ('')}

      <p data-testid="page-title">{pageTitle}</p>

      {search && <SearchBar history={ history } />}
    </div>
  );
}
Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
  history: PropTypes.shape({}).isRequired,
};

export default Header;
