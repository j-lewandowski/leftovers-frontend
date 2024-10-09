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
  setIsAuthenticated: (val: boolean) => void;
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
    setIsAuthenticated(!!localStorageToken || !!sessionStorageToken);
  }, []);

  const signOut = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    sessionStorage.removeItem('userId');
    setAccessToken('');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, accessToken, signOut }}
    >
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
