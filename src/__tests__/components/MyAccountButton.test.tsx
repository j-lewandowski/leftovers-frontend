import { render } from '@testing-library/react';
import MyAccountButton from '../../components/buttons/MyAccountButton';
import { describe, expect, it, vi } from 'vitest';
import '@testing-library/jest-dom';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('MyAccountButton', () => {
  it('should render MyAccount dropdown button', () => {
    const result = render(<MyAccountButton />);
    expect(result).toMatchSnapshot();
  });
});
