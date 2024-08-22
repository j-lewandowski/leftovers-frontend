import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import AuthenticatedUserButtons from '../../components/navbar/AuthenticatedUserButtons';

vi.mock('../../hooks/useAuth', () => ({
  useAuth: () => ({
    signOut: vi.fn(),
  }),
}));

describe('AuthenticatedUserButtons', () => {
  test('should render authenticated user buttons', () => {
    const result = render(<AuthenticatedUserButtons />);
    expect(result).toMatchSnapshot();
  });
});
