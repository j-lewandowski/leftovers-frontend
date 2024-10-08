import { MemoryRouter } from 'react-router-dom';
import { expect, test, vi } from 'vitest';
import * as AuthContext from '../../context/AuthContext';
import { render, screen } from '../../test-utils';
import Navbar from '../navbar/Navbar';

test('navbar displays buttons for sign up and log in if user is unauthenticated', () => {
  vi.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    accessToken: '',
    signOut: () => {},
  }));

  render(
    <MemoryRouter>
      <AuthContext.AuthProvider>
        <Navbar />
      </AuthContext.AuthProvider>
    </MemoryRouter>,
  );

  const signUpButton = screen.getByRole('button', { name: /log in/i });
  const signInButton = screen.getByRole('button', { name: /sign up/i });

  expect(signInButton).toBeDefined();
  expect(signUpButton).toBeDefined();
});

test('navbar displays my account button and add recipe button if user is authenticated', () => {
  vi.spyOn(AuthContext, 'useAuth').mockImplementation(() => ({
    isAuthenticated: true,
    setIsAuthenticated: () => {},
    accessToken: '',
    signOut: () => {},
  }));

  render(
    <MemoryRouter>
      <AuthContext.AuthProvider>
        <Navbar />
      </AuthContext.AuthProvider>
    </MemoryRouter>,
  );

  const myAccountButton = screen.getByRole('button', { name: /my account/i });
  const addRecipe = screen.getByRole('button', { name: /add recipe/i });

  expect(myAccountButton).toBeDefined();
  expect(addRecipe).toBeDefined();
});
