import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextTypes {
  isAuthenticated: boolean;
  accessToken: string;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageToken = localStorage.getItem('accessToken');
    const sessionStorageToken = sessionStorage.getItem('accessToken');

    setAccessToken(localStorageToken || sessionStorageToken || '');
    setIsAuthenticated(!!(localStorageToken || sessionStorageToken));
  }, []);

  const signOut = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    setAccessToken('');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
