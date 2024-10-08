import { MemoryRouter } from 'react-router-dom';
import { expect, test } from 'vitest';
import { AuthProvider } from '../../context/AuthContext';
import { render, screen } from '../../test-utils';
import MyAccountButton from '../buttons/MyAccountButton';

test('account options list is shown after my account button is clicked', async () => {
  const { user } = render(
    <MemoryRouter>
      <AuthProvider>
        <MyAccountButton />
      </AuthProvider>
    </MemoryRouter>,
  );
  const button = screen.getByRole('button', { name: /my account/i });
  await user.click(button);
  const listElement = screen.getByRole('menuitem', { name: /Saved recipes/i });
  expect(listElement).toBeDefined();
});
