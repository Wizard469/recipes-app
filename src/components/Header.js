import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header(props) {
  const { pageTitle, showSearch } = props;
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
          <img data-testid="search-top-btn" src={ searchIcon } alt="imagem search" />
        </div>) : ('')}
      <p data-testid="page-title">{pageTitle}</p>
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
  history: PropTypes.shape(
    { push: PropTypes.func },
  ).isRequired,

};

export default Header;
