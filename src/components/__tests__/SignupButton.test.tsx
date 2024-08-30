import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { fireEvent, render, screen } from '../../test-utils';
import SignupButton from '../buttons/SignupButton';

test('sign up modal is displayed after signup button is clicked', () => {
  render(
    <MemoryRouter>
      <SignupButton />
    </MemoryRouter>,
  );

  const button = screen.getByRole('button', { name: /sign up/i });
  fireEvent.click(button);

  const modalHeading = screen.getByRole('heading', { name: /sign up/i });
  expect(modalHeading).toBeDefined();
});
