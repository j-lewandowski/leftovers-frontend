import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { render, screen } from '../../test-utils';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';

test('send email button should be disabled if there was no valid email provided', () => {
  const { user } = render(
    <MemoryRouter initialEntries={['?forgot-password=true']}>
      <ForgotPasswordModal />
    </MemoryRouter>,
  );

  const sendEmailButton = screen.getByRole('button', { name: /send e-mail/i });
  expect(sendEmailButton).toBeDisabled();

  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });
  user.type(emailInput, 'invalid.email');
  expect(sendEmailButton).toBeDisabled();
});

test('send email button should be enabled if valid email was provided', async () => {
  const { user } = render(
    <MemoryRouter initialEntries={['?forgot-password=true']}>
      <ForgotPasswordModal />
    </MemoryRouter>,
  );

  const sendEmailButton = screen.getByRole('button', { name: /send e-mail/i });
  const emailInput = screen.getByRole('textbox', { name: /e-mail address/i });

  await user.type(emailInput, 'valid@email.com');
  expect(sendEmailButton).toBeEnabled();
});
