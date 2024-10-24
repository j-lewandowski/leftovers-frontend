import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { expect, test } from 'vitest';
import CategoriesButton from '../buttons/CategoriesButton';

test('recipe category list is shown after categories button is clicked', () => {
  render(
    <Router>
      <CategoriesButton />
    </Router>,
  );

  const button = screen.getByRole('button', { name: 'Recipes' });
  fireEvent.click(button);

  const listElement = screen.getByRole('menuitem', { name: /all recipes/i });

  expect(listElement).toBeDefined();
});
