import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import AuthenticatedUserButtons from '../../components/navbar/AuthenticatedUserButtons';

describe('AuthenticatedUserButtons', () => {
  test('should render authenticated user buttons', () => {
    const result = render(<AuthenticatedUserButtons />);
    expect(result).toMatchSnapshot();
  });
});
