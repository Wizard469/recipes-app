import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando o componente Header', () => {
  it('Testa de os componentes estão na tela', () => {
    const {history} = renderWithRouter(<App />);
    
    history.push('/foods');

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();

    const iconProfile = screen.getByRole('link', {name: /imagem profile/i});
    expect(iconProfile).toBeInTheDocument();

    const iconSearch = screen.getByRole("img", { name: /imagem search/i });
    expect(iconSearch).toBeInTheDocument();

    userEvent.click(iconProfile);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  });
});