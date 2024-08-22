import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Dropdown from '../../components/navbar/Dropdown';

describe('Dropdown', () => {
  test('should render dropdown', () => {
    const result = render(
      <Dropdown anchor={null} onClose={() => {}}>
        <div></div>
      </Dropdown>,
    );
    expect(result).toMatchSnapshot();
  });
});
