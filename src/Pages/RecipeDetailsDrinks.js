import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import context from '../context/Context';
import searcheIcon from '../images/searchIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetailsDrinks() {
  const { setFilterId, filterId, setRecomendations,
    recomendations, setFavorited, saveRecipesInProgress,
    foods, favoriteRecipe, setApp } = useContext(context);

  const { id } = useParams();
  const hrefUrl = window.location.href;
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const fetchId = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setFilterId(data.drinks);
    };
    fetchId();
    setApp(id);
  }, []);

  useEffect(() => {
    const IdFetch = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecomendations(data.meals);
    };
    IdFetch();
  }, []);

  const urlCopy = () => {
    copy(hrefUrl);
    setCopying(!copying);
  };

  const recomendationsFilter = recomendations.filter((_e, index) => index <= +'5');
  useEffect(() => {
    if (filterId.length) {
      setFavorited({
        id: filterId[0].idDrink,
        type: 'drink',
        nationality: '',
        category: filterId[0].strCategory,
        alcoholicOrNot: filterId[0].strAlcoholic,
        name: filterId[0].strDrink,
        image: filterId[0].strDrinkThumb,
      });
    }
  }, [filterId, setFavorited]);

  const ingredientsDrinks = filterId.length
  && Object.entries(filterId[0]).reduce((acc, e) => {
    if (e[0].includes('strIngredient')) {
      acc.push(e[1]);
    }
    return acc;
  }, []);

  const measuresObject = filterId.length && Object.entries(filterId[0])
    .reduce((acc, el) => {
      if (el[0].includes('strMeasure')) {
        acc.push(el[1]);
      }
      return acc;
    }, []);

  return (
    filterId.length && (
      <div>
        <img
          src={ filterId[0].strDrinkThumb }
          alt="imagem da receita"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{filterId[0].strDrink}</h1>
        <h2 data-testid="recipe-category">{filterId[0].strCategory}</h2>
        <h3 data-testid="recipe-category">{filterId[0].strAlcoholic}</h3>
        <ul>
          {ingredientsDrinks.filter((el) => el !== '' && el !== null)
            .map((e, i) => (
              <li
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
              >
                {`${e} ${measuresObject[i]}`}
              </li>
            ))}
        </ul>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => urlCopy() }
          >
            <img
              src={ searcheIcon }
              alt="icone perfil"
            />
          </button>
          {copying && <span>Link copied!</span>}
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => favoriteRecipe() }
            src={ foods ? blackHeartIcon : whiteHeartIcon }
          >
            <img src={ foods ? blackHeartIcon : whiteHeartIcon } alt="icone perfil" />
          </button>
        </div>
        <div>
          <h3 data-testid="instructions">{filterId[0].strInstructions}</h3>
        </div>
        <div>
          {recomendationsFilter.length
            && recomendationsFilter.map((e, i) => (
              <div
                key={ e.strDrink }
                data-testid={ `${i}-recomendation-card` }
              >
                <img src={ e.strDrinkThumb } alt="img da receita" />
                <h3 data-testid={ `${i}-recomendation-title` }>{e.strMeal}</h3>
              </div>
            ))}
        </div>
        <Link to={ `/drinks/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => saveRecipesInProgress('',
              ingredientsDrinks.filter((item) => item !== null)) }
          >
            Continue Recipe
          </button>
        </Link>
      </div>
    )
  );
}

export default RecipeDetailsDrinks;
