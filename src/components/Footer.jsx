import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/drinks">

        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="icone de drinks"
        />

      </Link>
      <Link to="/foods">

        <img
          src={ mealIcon }
          data-testid="food-bottom-btn"
          alt="icone de foods"
        />

      </Link>
    </footer>
  );
}

export default Footer;
