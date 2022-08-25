import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import { meals } from './mocks/apiResponse';
import oneDrink from "../../cypress/mocks/oneDrink";
import drinks from "../../cypress/mocks/drinks";
import oneMeal from "../../cypress/mocks/oneMeal";

afterEach(() => jest.clearAllMocks());

describe('SearchBar', () => {
it('Renderiza componente SearchBar', () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(meals),
  });
  jest.spyOn(global, 'alert').mockImplementation(() => {});

  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginBtn = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, 'test@test.com');
  userEvent.type(passwordInput, '1234567');

  userEvent.click(loginBtn);
  const searchBtn = screen.getByTestId('search-top-btn');
  userEvent.click(searchBtn);
  const searchButton = screen.getByTestId('exec-search-btn');
  userEvent.click(searchButton);

  const firstLetterOption = screen.getByTestId('first-letter-search-radio');
  const ingredientOption = screen.getByTestId('ingredient-search-radio');
  const searchInput = screen.getByTestId('search-input');

  userEvent.type(searchInput, 'c');
  userEvent.click(firstLetterOption);
  userEvent.click(searchButton);

  userEvent.type(searchInput, 'ch');
  userEvent.click(firstLetterOption);
  userEvent.click(searchButton);

  userEvent.type(searchInput, 'chicken');
  userEvent.click(ingredientOption);
  userEvent.click(searchButton);

  userEvent.type(searchInput, 'Arrabiata');
  const nameOption = screen.getByTestId('name-search-radio');
  userEvent.click(nameOption);
  userEvent.click(searchButton);
});

it('Renderiza componente SearchBar', () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(drinks),
  });
  jest.spyOn(global, 'alert').mockImplementation(() => {});

  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginBtn = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, 'test@test.com');
  userEvent.type(passwordInput, '1234567');

  userEvent.click(loginBtn);
  const drinksPage = screen.getByTestId('drinks-bottom-btn');
  userEvent.click(drinksPage);

  const searchBtn = screen.getByTestId('search-top-btn');
  userEvent.click(searchBtn);
  const searchButton = screen.getByTestId('exec-search-btn');
  userEvent.click(searchButton);

  const firstLetterOption = screen.getByTestId('first-letter-search-radio');
  const ingredientOption = screen.getByTestId('ingredient-search-radio');
  const searchInput = screen.getByTestId('search-input');

  userEvent.type(searchInput, 'w');
  userEvent.click(firstLetterOption);
  userEvent.click(searchButton);

  userEvent.type(searchInput, 'wi');
  userEvent.click(firstLetterOption);
  userEvent.click(searchButton);

  userEvent.type(searchInput, 'Wine');
  userEvent.click(ingredientOption);
  userEvent.click(searchButton);
});

it('renderiza só um drink', () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(oneDrink),
  });
  jest.spyOn(global, 'alert').mockImplementation(() => {});

  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginBtn = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, 'test@test.com');
  userEvent.type(passwordInput, '1234567');

  userEvent.click(loginBtn);

  const drinksPage = screen.getByTestId('drinks-bottom-btn');
  userEvent.click(drinksPage);


  const searchBtn = screen.getByTestId('search-top-btn');
  userEvent.click(searchBtn);
  const searchButton = screen.getByTestId('exec-search-btn');
  userEvent.click(searchButton);
  const searchInput = screen.getByTestId('search-input');

  userEvent.type(searchInput, 'Aquamarine');
  const nameOption = screen.getByTestId('name-search-radio');
  userEvent.click(nameOption);
  userEvent.click(searchButton);
});

it('renderiza só um meal', () => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(oneMeal),
  });
  jest.spyOn(global, 'alert').mockImplementation(() => {});

  renderWithRouter(<App />);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginBtn = screen.getByTestId('login-submit-btn');
  userEvent.type(emailInput, 'test@test.com');
  userEvent.type(passwordInput, '1234567');

  userEvent.click(loginBtn);

  const searchBtn = screen.getByTestId('search-top-btn');
  userEvent.click(searchBtn);
  const searchButton = screen.getByTestId('exec-search-btn');
  userEvent.click(searchButton);
  const searchInput = screen.getByTestId('search-input');

  userEvent.type(searchInput, 'Spicy Arrabiata Penne');
  const nameOption = screen.getByTestId('name-search-radio');
  userEvent.click(nameOption);
  userEvent.click(searchButton);
});
});
