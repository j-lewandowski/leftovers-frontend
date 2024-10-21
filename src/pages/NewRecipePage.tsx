import { Box, Stack, styled } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { PreparationTime } from '../assets/constants/enums';
import AddRecipeFormHeader from '../components/forms/add-recipe-form/AddRecipeFormHeader';
import BasicInformation from '../components/forms/add-recipe-form/BasicInformation';
import Ingredients from '../components/forms/add-recipe-form/Ingredients';
import PreparationMethod from '../components/forms/add-recipe-form/PreparationMethod';
import Publication from '../components/forms/add-recipe-form/Publication';
import MultistepFormProvider, {
  useMultistepForm,
} from '../context/MultistepFormContext';

interface NewRecipeFormInput {
  title: string;
  description: string;
  category: string;
  preparationTime: PreparationTime | string;
  image: string;
  ingredients: Array<{ name: string }>;
  preparationMethod: Array<{ name: string }>;
}

const NewRecipePage = () => {
  return (
    <MultistepFormProvider>
      <Page />
    </MultistepFormProvider>
  );
};

const Page = () => {
  const { stepNumber } = useMultistepForm();
  const methods = useForm<NewRecipeFormInput>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      preparationTime: '',
      image: '',
      ingredients: [{ name: '' }, { name: '' }, { name: '' }],
      preparationMethod: [{ name: '' }, { name: '' }, { name: '' }],
    },
    reValidateMode: 'onChange',
  });

  return (
    <NewRecipePageWrapper>
      <AddRecipeFormHeader />

      <PageContentWrapper padding={4}>
        <FormProvider {...methods}>
          <BasicInformation isVisible={stepNumber === 0} />
          <Ingredients isVisible={stepNumber === 1} />
          <PreparationMethod isVisible={stepNumber === 2} />
          <Publication isVisible={stepNumber === 3} />
        </FormProvider>
      </PageContentWrapper>
    </NewRecipePageWrapper>
  );
};
const NewRecipePageWrapper = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: 'calc(100dvh - 8.5rem)',
  position: 'relative',
  padding: '2.5rem 3rem',
  gap: '1rem',
  backgroundColor: theme.palette.background.default,
}));

const PageContentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '1rem',
  width: '100%',
  height: 'fit-content',
}));

export default NewRecipePage;
