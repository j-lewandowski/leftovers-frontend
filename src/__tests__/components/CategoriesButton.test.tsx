import { render } from '@testing-library/react';
import CategoriesButton from '../../components/buttons/CategoriesButton';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../../hooks/useCategories', () => ({
  useCategories: () => ({
    categories: ['dinner', 'drinks'],
  }),
}));

describe('CategoriesButton', () => {
  it('should render categories dropdown button', () => {
    const result = render(<CategoriesButton />);
    expect(result).toMatchSnapshot();
  });
});
