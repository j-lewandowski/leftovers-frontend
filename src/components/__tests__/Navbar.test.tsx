import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import * as useAuth from '../../hooks/useAuth';
import { render, screen } from '../../test-utils';
import Navbar from '../navbar/Navbar';

test('navbar displays buttons for sign up and log in if user is unauthenticated', () => {
  vi.spyOn(useAuth, 'useAuth').mockImplementation(() => ({
    isAuthenticated: false,
    accessToken: '',
    signOut: () => {},
  }));

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

  const signUpButton = screen.getByRole('button', { name: /log in/i });
  const signInButton = screen.getByRole('button', { name: /sign up/i });

  expect(signInButton).toBeDefined();
  expect(signUpButton).toBeDefined();
});

test('navbar displays my account button and add recipe button if user is authenticated', () => {
  vi.spyOn(useAuth, 'useAuth').mockImplementation(() => ({
    isAuthenticated: true,
    accessToken: '',
    signOut: () => {},
  }));

  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

  const myAccountButton = screen.getByRole('button', { name: /my account/i });
  const addRecipe = screen.getByRole('button', { name: /add recipe/i });

  expect(myAccountButton).toBeDefined();
  expect(addRecipe).toBeDefined();
});
