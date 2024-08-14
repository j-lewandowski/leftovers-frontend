import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const signOut = () => {
    localStorage.removeItem('accessToken');
    setAccessToken('');
    setIsAuthenticated(false);
    navigate('/');
  };

  return { isAuthenticated, accessToken, signOut };
};
