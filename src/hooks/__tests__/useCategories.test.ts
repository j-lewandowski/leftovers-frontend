import { renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useCategories } from '../../hooks/useCategories';

describe('useCategories', () => {
  test('should return list of categories', () => {
    const { result } = renderHook(() => useCategories());
    expect(result.current.categories.length).toBeGreaterThan(0);
  });
});
