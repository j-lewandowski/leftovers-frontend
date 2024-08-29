import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageToken = localStorage.getItem('accessToken');
    const sessionStorageToken = sessionStorage.getItem('accessToken');

    setAccessToken(localStorageToken || sessionStorageToken || '');
    setIsAuthenticated(!!(localStorageToken || sessionStorageToken));
  }, [navigate]);

  const signOut = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    setAccessToken('');
    setIsAuthenticated(false);
    navigate('/');
  };

  return { isAuthenticated, accessToken, signOut };
};
