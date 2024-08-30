import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import CategoriesButton from '../buttons/CategoriesButton';

test('recipe category list is shown after categories button is clicked', () => {
  render(<CategoriesButton />);

  const button = screen.getByRole('button', { name: 'Recipes' });
  fireEvent.click(button);

  const listElement = screen.getByRole('menuitem', { name: /all recipes/i });

  expect(listElement).toBeDefined();
});
