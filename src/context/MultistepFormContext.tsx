import { createContext, ReactNode, useContext, useState } from 'react';

const MultistepFormContext = createContext<{
  stepNumber: number;
  onTabClick: (event: React.SyntheticEvent, tabNumber: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  validPages: boolean[];
  validatePage: (pageNumber: number, isValid: boolean) => void;
  isEdit: boolean;
} | null>(null);

const MultistepFormProvider = ({ children }: { children: ReactNode }) => {
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [validPages, setValidPages] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const isEdit = location.pathname.includes('edit-recipe');
  const onTabClick = (event: React.SyntheticEvent, tabNumber: number) => {
    setStepNumber(tabNumber);
  };

  const goToNextStep = () => {
    setStepNumber((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setStepNumber((prev) => prev - 1);
  };

  const validatePage = (pageNumber: number, isValid: boolean) => {
    setValidPages((prev) => {
      const newValidPages = [...prev];
      newValidPages[pageNumber] = isValid;
      return newValidPages;
    });
  };

  return (
    <MultistepFormContext.Provider
      value={{
        stepNumber,
        onTabClick,
        goToNextStep,
        goToPreviousStep,
        validPages,
        validatePage,
        isEdit,
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
