import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '../../test-utils';
import SigninModal from '../modals/SigninModal';

test('signin modal fields should be empty, remember me checkbox should be unchecked by default and log in button should be disabled by default', () => {
  render(
    <MemoryRouter initialEntries={['?signin=true']}>
      <SigninModal />
    </MemoryRouter>,
  );

  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const rememberMe = screen.getByRole('checkbox', {
    name: /remember me/i,
  });
  const logInButton = screen.getByRole('button', { name: /log in/i });

  expect(emailInput.textContent).toBe('');
  expect(passwordInput.textContent).toBe('');
  expect(rememberMe).not.toBeChecked();
  expect(logInButton).toBeDisabled();
});

test('sign in button is disabled if email is invalid', () => {
  render(
    <MemoryRouter initialEntries={['?signin=true']}>
      <SigninModal />
    </MemoryRouter>,
  );

  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
  const logInButton = screen.getByRole('button', { name: /log in/i });

  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

  expect(logInButton).toBeDisabled();
});

test('sign in button is enabled if valid credentials are provided', async () => {
  const { user } = render(
    <MemoryRouter initialEntries={['?signin=true']}>
      <SigninModal />
    </MemoryRouter>,
  );

  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const logInButton = screen.getByRole('button', { name: /log in/i });

  await user.type(emailInput, 'valid@email.com');
  await user.type(passwordInput, 'some-password');

  expect(logInButton).toBeEnabled();
});
