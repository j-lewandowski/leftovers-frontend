import { render } from '@testing-library/react';
import Navbar from '../../components/navbar/Navbar';
import { describe, test, expect, vi } from 'vitest';

describe('Navbar component', () => {
  test('should render unauthenticated user navbar', () => {
    vi.mock('../../hooks/useAuth', () => ({
      useAuth: () => ({
        isAuthenticated: false,
      }),
    }));
    const result = render(<Navbar />);
    expect(result).toMatchSnapshot();
  });

  test('should render authenticated user navbar', () => {
    vi.mock('../../hooks/useAuth', () => ({
      useAuth: () => ({
        isAuthenticated: true,
      }),
    }));
    const result = render(<Navbar />);

    expect(result).toMatchSnapshot();
  });
});
