import { render } from '@testing-library/react';
import MyAccountButton from '../../components/buttons/MyAccountButton';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom';

describe('MyAccountButton', () => {
  it('should render MyAccount dropdown button', () => {
    const result = render(<MyAccountButton />);
    expect(result).toMatchSnapshot();
  });
});
