import React from "react";
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

describe("Profile test", () => {
  it("should", () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginBtn);

    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);

    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
  });
});
