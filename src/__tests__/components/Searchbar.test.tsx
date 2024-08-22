import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import Searchbar from '../../components/navbar/Searchbar';

describe('Searchbar', () => {
  test('should render searchbar', () => {
    const result = render(<Searchbar />);
    expect(result).toMatchSnapshot();
  });
});
