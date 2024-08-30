import { describe, test, expect, vi } from 'vitest';
import { useAuth } from '../../hooks/useAuth';
import { act, renderHook } from '@testing-library/react';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('useAuth', () => {
  test('should return isAuthenticated, accessToken, and signOut', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.accessToken).toBeDefined();
    expect(result.current.isAuthenticated).toBeDefined();
    expect(result.current.signOut).toBeDefined();
  });

  test('should set isAuthenticated to true and accessToken to token from local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');

    const { result } = renderHook(() => useAuth());
    expect(result.current.accessToken).toEqual('token');
    expect(result.current.isAuthenticated).toEqual(true);
  });

  test('should set isAuthenticated to true and accessToken to token from local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');

    const { result } = renderHook(() => useAuth());
    expect(result.current.accessToken).toEqual('token');
    expect(result.current.isAuthenticated).toEqual(true);
  });

  test('should set isAuthenticated to false return empty access token if there is no token in local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const { result } = renderHook(() => useAuth());
    expect(result.current.accessToken).toEqual('');
    expect(result.current.isAuthenticated).toEqual(false);
  });

  test('should remove token from localstorage, reset the state and redirect user', () => {
    vi.spyOn(Storage.prototype, 'removeItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');

    const { result } = renderHook(() => useAuth());
    act(() => result.current.signOut());
    expect(result.current.accessToken).toEqual('');
    expect(result.current.isAuthenticated).toEqual(false);
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(Storage.prototype.removeItem).toHaveBeenCalled();
  });
});
