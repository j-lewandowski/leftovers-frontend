import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextTypes {
  userId: string;
  setUserId: (userId: string) => void;
  accessToken: string;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextTypes | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageToken = localStorage.getItem('accessToken');
    const sessionStorageToken = sessionStorage.getItem('accessToken');

    const localStorageUserId = localStorage.getItem('userId');
    const sessionStorageUserId = sessionStorage.getItem('userId');

    setAccessToken(localStorageToken || sessionStorageToken || '');
    setUserId(localStorageUserId || sessionStorageUserId || '');
  }, []);

  const signOut = () => {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('accessToken');
    setAccessToken('');
    setUserId('');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ userId, setUserId, accessToken, signOut }}>
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
