import { render } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import UnauthenticatedUserButtons from '../../components/navbar/UnauthenticatedUserButtons';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('UnauthenticatedUserButtons', () => {
  test('should render unauthenticated user buttons', () => {
    const result = render(<UnauthenticatedUserButtons />);
    expect(result).toMatchSnapshot();
  });
});
