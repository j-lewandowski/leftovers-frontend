import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const signOut = () => {
    sessionStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, accessToken, signOut };
};
