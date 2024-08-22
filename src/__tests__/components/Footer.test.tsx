import { render } from '@testing-library/react';
import Footer from '../../components/footer/Footer';
import { describe, test, expect } from 'vitest';

describe('Footer', () => {
  test('renders footer', () => {
    const result = render(<Footer />);
    expect(result).toMatchSnapshot();
  });
});
