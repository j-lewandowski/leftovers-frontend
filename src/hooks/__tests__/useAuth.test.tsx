import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { AuthProvider, useAuth } from '../../context/AuthContext';

vi.mock('@tanstack/react-query', () => ({
  ...vi.importActual('@tanstack/react-query'),
  useQueryClient: () => ({
    invalidateQueries: vi.fn(),
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth', () => {
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('should return isAuthenticated, accessToken, and signOut', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.accessToken).toBeDefined();
    expect(result.current.isAuthenticated).toBeDefined();
    expect(result.current.signOut).toBeDefined();
  });

  test('should set isAuthenticated to true and accessToken to token from local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.accessToken).toEqual('token');
    expect(result.current.isAuthenticated).toEqual(true);
  });

  test('should set isAuthenticated to true and accessToken to token from local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.accessToken).toEqual('token');
    expect(result.current.isAuthenticated).toEqual(true);
  });

  test('should set isAuthenticated to false return empty access token if there is no token in local storage', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.accessToken).toEqual('');
    expect(result.current.isAuthenticated).toEqual(false);
  });

  test('should remove token from localstorage, reset the state and redirect user', () => {
    vi.spyOn(Storage.prototype, 'removeItem');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('token');

    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => result.current.signOut());
    expect(result.current.accessToken).toEqual('');
    expect(result.current.isAuthenticated).toEqual(false);
    expect(Storage.prototype.removeItem).toHaveBeenCalled();
  });
});
