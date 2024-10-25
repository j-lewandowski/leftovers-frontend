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
import { NewRecipeFormInput } from '../models/recipe.model';

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
      categoryName: '',
      preparationTime: PreparationTime.UP_TO_15_MIN,
      image: '',
      ingredients: [{ name: '' }, { name: '' }, { name: '' }],
      preparationSteps: [{ name: '' }, { name: '' }, { name: '' }],
    },
    mode: 'all',
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
