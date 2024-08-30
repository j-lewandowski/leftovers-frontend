import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { render, screen } from '../../test-utils';
import SignupModal from '../modals/SignupModal';

test('signup modal fields should be empty, remember me checkbox should be unchecked by default and sign up button should be disabled by default', () => {
  render(
    <MemoryRouter initialEntries={['?signup=true']}>
      <SignupModal />
    </MemoryRouter>,
  );

  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const AcceptTC = screen.getByRole('checkbox', {
    name: /acceptance/i,
  });
  const signUpButton = screen.getByRole('button', {
    name: /create an account/i,
  });

  expect(emailInput.textContent).toBe('');
  expect(passwordInput.textContent).toBe('');
  expect(AcceptTC).not.toBeChecked();
  expect(signUpButton).toBeDisabled();
});

test('create account button is disabled if email is invalid', async () => {
  const { user } = render(
    <MemoryRouter initialEntries={['?signup=true']}>
      <SignupModal />
    </MemoryRouter>,
  );

  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
  const signUpButton = screen.getByRole('button', {
    name: /create an account/i,
  });

  await user.type(emailInput, 'invalid-email');

  expect(signUpButton).toBeDisabled();
});

test('create account button is disabled if credentials are valid but Terms & Conditions checkbox is unchecked', async () => {
  const { user } = render(
    <MemoryRouter initialEntries={['?signup=true']}>
      <SignupModal />
    </MemoryRouter>,
  );

  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const signUpButton = screen.getByRole('button', {
    name: /create an account/i,
  });

  await user.type(emailInput, 'valid@email.com');
  await user.type(passwordInput, 'password');

  expect(signUpButton).toBeDisabled();
});

test('sign in button is enabled if valid credentials are provided and Terms & Conditions checkbox is checked', async () => {
  const { user } = render(
    <MemoryRouter initialEntries={['?signup=true']}>
      <SignupModal />
    </MemoryRouter>,
  );

  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
  const passwordInput = screen.getByLabelText(/password/i);
  const checkbox = screen.getByRole('checkbox', { name: /acceptance/i });
  const signUpButton = screen.getByRole('button', {
    name: /create an account/i,
  });

  await user.type(emailInput, 'valid@email.com');
  await user.type(passwordInput, 'some-password');
  await user.click(checkbox);

  expect(signUpButton).toBeEnabled();
});
