import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import userEvent from '@testing-library/user-event';
import apiResponse from './mocks/apiResponse';


describe('Testa a página foods', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(apiResponse),
    }));
  });

  afterEach(() => jest.clearAllMocks());

  it('testa o filtro por ingredientes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const ingredientSearch = screen.getByTestId('ingredient-search-radio');
    const button = screen.getAllByRole('button', { name:/search/i });

    userEvent.click(ingredientSearch);
    userEvent.type(searchInput, 'steak');
    userEvent.click(button[1]);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    const ingredients = screen.getByTestId('0-card-name');
    expect(ingredients).toHaveTextContent('Steak and Kidney Pie');
  });

  it('testa o filtro por nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchRadio = screen.getByTestId('name-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.click(searchRadio);
    userEvent.type(searchInput, 'Steak');
    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=Steak'));
  });

  it('testa o filtro com a primeira letra', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetter);
    userEvent.type(searchInput, 's');
    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=s'));
  });

  it('testa se ao pesquisar por duas letras o alert é acionado', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({ 'meals': null }),
    }));

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetter);
    userEvent.type(searchInput, 'st');
    userEvent.click(button);

    await waitFor(() => expect(global.alert).toBeCalledWith('Your search must have only 1 (one) character'))
  });

  it('testa se pesquisar por algo que não existe o alert é disparado', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({ 'meals': null }),
    }));

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'macarrão');
    userEvent.click(button);

    // const message = 'Sorry, we haven';
    await waitFor(() => expect(global.alert).toBeCalledWith(`Sorry, we couldn't find any recipes for this filter.`))
  });

  it('testa se ao encontrar o item a pessoa é redirecionada para página de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));

    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve({
        'meals': [
          {
            'strMeal': 'Steak and Kidney Pie',
            'strMealThumb': 'https://www.themealdb.com/images/media/meals/qysyss1511558054.jpg',
            'idMeal': '52881',
          }
        ]
      }),
    }));

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchRadio = screen.getByTestId('name-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.click(searchRadio);
    userEvent.type(searchInput, 'Steak and Kidney Pie');
    userEvent.click(button);

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());    

    

    expect(history.location.pathname).toBe('/foods/52881')

    
  });
});


describe('Testa a página drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(apiResponse),
    }));
  });

  afterEach(() => jest.clearAllMocks());

  it('testa o filtro por ingredientes', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    await waitFor(() => expect(global.fetch).toBeCalledTimes(2)); 

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchRadio = screen.getByTestId('ingredient-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.click(searchRadio);
    userEvent.type(searchInput, 'beer');
    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=beer'));
  });

  it('testa o filtro por nome', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId('search-input');
    const searchRadio = screen.getByTestId('name-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.click(searchRadio);
    userEvent.type(searchInput, 'tequila');
    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=tequila'));
  });

  it('testa o filtro com a primeira letra', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    // const search = screen.getByTestId('search-input');
    // const radio3 = screen.getByTestId('first-letter-search-radio');

    const searchInput = screen.getByTestId('search-input');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const button = screen.getByTestId('exec-search-btn');

    userEvent.click(firstLetter);
    userEvent.type(searchInput, 't');
    userEvent.click(button);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=t'));

  });
});