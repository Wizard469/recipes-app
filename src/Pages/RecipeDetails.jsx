import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import context from '../context/Context';
import searcheIcon from '../images/searchIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetailsFood() {
  const { setFilterId, filterId, setRecomendations,
    recomendations, setFavorited, saveRecipesInProgress,
    foods, favoriteRecipe, setApp, ingredients } = useContext(context);

  const { id } = useParams();
  const hrefUrl = window.location.href;
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const fetchIdFood = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setFilterId(data.meals);
    };
    fetchIdFood();
    setApp(id);
  }, []);

  useEffect(() => {
    const IdFetchFood = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setRecomendations(data.drinks);
    };
    IdFetchFood();
  }, []);

  const urlCopy = () => {
    copy(hrefUrl);
    setCopying(!copying);
  };

  const recomendationsFilter = recomendations.filter((_e, index) => index <= +'5');
  useEffect(() => {
    if (filterId.length) {
      setFavorited({
        id: filterId[0].idMeal,
        type: 'food',
        nationality: filterId[0].strArea,
        category: filterId[0].strCategory,
        alcoholicOrNot: '',
        name: filterId[0].strMeal,
        image: filterId[0].strMealThumb,
      });
    }
  }, [filterId, setFavorited]);

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
          src={ filterId[0].strMealThumb }
          alt="imagem da receita"
          data-testid="recipe-photo"
        />
        <h1 data-testid="recipe-title">{filterId[0].strMeal}</h1>
        <h2 data-testid="recipe-category">{filterId[0].strCategory}</h2>
        <ul>
          {ingredients.filter((el) => el !== '' && el !== null).map((e, i) => (
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
        <iframe
          data-testid="video"
          src={ filterId[0].strYoutube.replace('watch?v=', 'embed/') }
          frameBorder="0"
          title="Embedded youtube"
        />
        <div>
          {recomendationsFilter.length
            && recomendationsFilter.map((e, i) => (
              <div
                key={ e.strDrink }
                data-testid={ `${i}-recomendation-card` }
              >
                <img src={ e.strDrinkThumb } alt="img da receita" />
                <h3 data-testid={ `${i}-recomendation-title` }>{e.strDrink}</h3>
              </div>
            ))}
        </div>
        <Link to={ `/foods/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ () => ingredients && saveRecipesInProgress('',
              ingredients.filter((item) => item !== null)) }
          >
            Continue Recipe
          </button>
        </Link>
      </div>
    )
  );
}

export default RecipeDetailsFood;
