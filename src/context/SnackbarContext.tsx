import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface SnackbarContextTypes {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

const SnackbarContext = createContext<SnackbarContextTypes | null>(null);

export const SnackbarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [message, setMessage] = useState<string>('');

  return (
    <SnackbarContext.Provider value={{ message, setMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error('useSnackbar must be used within an SnackbarProvider');
  return context;
};
