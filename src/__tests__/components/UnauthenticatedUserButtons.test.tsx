import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import UnauthenticatedUserButtons from '../../components/navbar/UnauthenticatedUserButtons';

describe('UnauthenticatedUserButtons', () => {
  test('should render unauthenticated user buttons', () => {
    const result = render(<UnauthenticatedUserButtons />);
    expect(result).toMatchSnapshot();
  });
});
