import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Search from '../components/Search';
import { renderWithRouter } from '../helpers/renderWithRouter';
import { meals, meal } from './mocks/apiResponse';

afterEach(() => jest.clearAllMocks());

const inputTestId = 'search-input';
const ingredientTestId = 'ingredient-search-radio';
const nameTestId = 'name-search-radio';
const letterTestId = 'first-letter-search-radio';
const buttonTestId = 'exec-search-btn';
const three = 3;

describe('Search', () => {
  it('testa se renderiza com os elementos', () => {
    renderWithRouter(<Search />);

    const inputText = screen.getByTestId(inputTestId);
    const ingredientRadio = screen.getByTestId(ingredientTestId);
    const nameRadio = screen.getByTestId(nameTestId);
    const firstLetter = screen.getByTestId(letterTestId);
    const button = screen.getByTestId(buttonTestId);

    expect(inputText).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('testa se é feita a requisição correta quando o usuário está na página de comidas', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));

    renderWithRouter(<Search />,
      { location: { pathname: { history: '/foods' } } });

      const inputText = screen.getByTestId(inputTestId);
      const ingredientRadio = screen.getByTestId(ingredientTestId);
      const nameRadio = screen.getByTestId(nameTestId);
      const firstLetter = screen.getByTestId(letterTestId);
      const button = screen.getByTestId(buttonTestId);

    userEvent.type(inputText, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(button);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');

    userEvent.click(nameRadio);
    userEvent.click(button);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');

    userEvent.clear(inputText);
    userEvent.type(inputText, 'c');
    userEvent.click(firstLetter);
    userEvent.click(button);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(three);
    expect(fetch).toHaveBeenLastCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
  });

  it('testa se é feita a requisição correta quando o usuário está na página de bebidas', () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meals,
    }));

    renderWithRouter(<Search />,
      { initialState: { header: { pathname: '/drinks' } } });

      const inputText = screen.getByTestId(inputTestId);
      const ingredientRadio = screen.getByTestId(ingredientTestId);
      const nameRadio = screen.getByTestId(nameTestId);
      const firstLetter = screen.getByTestId(letterTestId);
      const button = screen.getByTestId(buttonTestId);

    userEvent.type(inputText, 'beer');
    userEvent.click(ingredientRadio);
    userEvent.click(button);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=beer');

    userEvent.click(nameRadio);
    userEvent.click(button);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=beer');

    userEvent.clear(inputText);
    userEvent.type(inputText, 'b');
    userEvent.click(firstLetter);
    userEvent.click(button);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(three);
    expect(fetch).toHaveBeenLastCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b');
  });

  it('testa se aparece o alerta quando o  usuário tenta buscar com mais de uma letra', () => {
    global.alert = jest.fn();

    renderWithRouterAndRedux(<SearchBar />);

    const inputText = screen.getByTestId(inputTestId)
    const firstLetter = screen.getByTestId(letterTestId);
    const button = screen.getByTestId(buttonTestId);
    const alertMessage = 'Your search must have only 1 (one) character';

    userEvent.type(inputText, 'ingredient y');
    userEvent.click(firstLetter);
    userEvent.click(button);

    expect(alert).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith(alertMessage);
  });

  
  it(`testa se o usuário é redirecionado para a página de detalhes caso a busca retorne
  um único resultado`, async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => meal,
    }));

    const { history } = await waitFor(() => renderWithRouter(<App />));

    history.push('/foods');

    const searchTopbtn = screen.getByTestId('search-top-btn');

    userEvent.click(searchTopbtn);

    const inputText = screen.getByTestId(inputTestId)
    const ingredientRadio = screen.getByTestId(ingredientTestId);
    const button = screen.getByTestId(buttonTestId);

    userEvent.type(inputText, 'cheese');
    userEvent.click(ingredientRadio);
    userEvent.click(button);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/foods/52882');
  });
});