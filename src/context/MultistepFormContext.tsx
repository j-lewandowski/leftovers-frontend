import { createContext, ReactNode, useContext, useState } from 'react';

const MultistepFormContext = createContext<{
  stepNumber: number;
  onTabClick: (event: React.SyntheticEvent, tabNumber: number) => void;
  next: () => void;
  back: () => void;
} | null>(null);

const MultistepFormProvider = ({ children }: { children: ReactNode }) => {
  const [stepNumber, setStepNumber] = useState<number>(0);

  const onTabClick = (event: React.SyntheticEvent, tabNumber: number) => {
    setStepNumber(tabNumber);
  };

  const next = () => {
    setStepNumber((prev) => prev + 1);
  };

  const back = () => {
    setStepNumber((prev) => prev - 1);
  };

  return (
    <MultistepFormContext.Provider
      value={{
        stepNumber,
        onTabClick,
        next,
        back,
      }}
    >
      {children}
    </MultistepFormContext.Provider>
  );
};

export const useMultistepForm = () => {
  const context = useContext(MultistepFormContext);

  if (!context) {
    throw new Error(
      'useMultistepForm must be used within a MultistepFormProvider',
    );
  }

  return context;
};

export default MultistepFormProvider;
