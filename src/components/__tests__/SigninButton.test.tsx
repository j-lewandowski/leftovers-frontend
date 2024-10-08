import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { AuthProvider } from '../../context/AuthContext';
import { fireEvent, render, screen } from '../../test-utils';
import SigninButton from '../buttons/SigninButton';

test('sign in modal is displayed after signin button is clicked', () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <SigninButton />
      </AuthProvider>
    </MemoryRouter>,
  );

  const button = screen.getByRole('button', { name: /log in/i });
  fireEvent.click(button);

  const modalHeading = screen.getByRole('heading', { name: /log in/i });
  expect(modalHeading).toBeDefined();
});
