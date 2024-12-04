import { createContext, ReactNode, useContext, useState } from 'react';

const MultistepFormContext = createContext<{
  stepNumber: number;
  onTabClick: (event: React.SyntheticEvent, TabIndex: number) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  validPages: boolean[];
  validatePage: (pageNumber: number, isValid: boolean) => void;
  isEditMode: boolean;
  slideDirection: 'left' | 'right';
} | null>(null);

const MultistepFormProvider = ({ children }: { children: ReactNode }) => {
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [validPages, setValidPages] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>(
    'right',
  );
  const isEditMode = location.pathname.includes('edit-recipe');
  const onTabClick = (_: React.SyntheticEvent, TabIndex: number) => {
    setSlideDirection(TabIndex > stepNumber ? 'left' : 'right');
    setStepNumber(TabIndex);
  };

  const goToNextStep = () => {
    setSlideDirection('left');
    setStepNumber((prev) => prev + 1);
  };

  const goToPreviousStep = () => {
    setSlideDirection('right');
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
        isEditMode,
        slideDirection,
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
