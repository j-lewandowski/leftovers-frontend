import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { render, screen } from '../../test-utils';
import ResetPasswordModal from '../modals/ResetPasswordModal';

test('reset my password should be disabled by default', () => {
  render(
    <MemoryRouter initialEntries={['?reset-password=true&requestId=test']}>
      <ResetPasswordModal />
    </MemoryRouter>,
  );

  const resetPasswordButton = screen.getByRole('button', {
    name: /reset my password/i,
  });

  expect(resetPasswordButton).toBeDisabled();
});

test('reset my password button should only be enabled if both passwords are the same', async () => {
  const { user } = render(
    <MemoryRouter initialEntries={['?reset-password=true&requestId=test']}>
      <ResetPasswordModal />
    </MemoryRouter>,
  );

  const passwordInputs = screen.getAllByLabelText(/new password/i);
  const resetPasswordButton = screen.getByRole('button', {
    name: /reset my password/i,
  });
  await user.type(passwordInputs[1], 'password');

  expect(resetPasswordButton).toBeDisabled();

  await user.type(passwordInputs[2], 'passwrd');

  expect(resetPasswordButton).toBeDisabled();

  await user.clear(passwordInputs[2]);
  await user.type(passwordInputs[2], 'password');

  expect(resetPasswordButton).toBeEnabled();
});
