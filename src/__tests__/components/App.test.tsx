import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../../App';

test('renders the App component', () => {
  render(<App />);
  expect(screen.getByText('Hello World')).toBeDefined();
});
