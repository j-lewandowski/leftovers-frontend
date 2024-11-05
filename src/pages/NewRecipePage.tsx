import { Box, Stack, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { DEFAULT_ENDPOINTS } from '../assets/constants/api';
import AddRecipeFormHeader from '../components/forms/add-recipe-form/AddRecipeFormHeader';
import BasicInformation from '../components/forms/add-recipe-form/BasicInformation';
import Ingredients from '../components/forms/add-recipe-form/Ingredients';
import PreparationMethod from '../components/forms/add-recipe-form/PreparationMethod';
import Publication from '../components/forms/add-recipe-form/Publication';
import MultistepFormProvider, {
  useMultistepForm,
} from '../context/MultistepFormContext';
import { NewRecipeFormInput } from '../models/recipe.model';
import httpService from '../services/http.service';

const NewRecipePage = () => {
  return (
    <MultistepFormProvider>
      <Page />
    </MultistepFormProvider>
  );
};

const Page = () => {
  const { stepNumber } = useMultistepForm();
  const { recipeId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['recipe'],
    queryFn: async () => {
      if (!recipeId) return;
      const res = await httpService.get(
        `${DEFAULT_ENDPOINTS.RECIPES}/${recipeId}`,
      );
      return res.data;
    },
    enabled: !!recipeId,
  });

  const methods = useForm<NewRecipeFormInput>({
    defaultValues: {
      title: '',
      description: '',
      categoryName: '',
      preparationTime: '',
      imageFile: null,
      imagePreview: null,
      ingredients: [{ name: '' }, { name: '' }, { name: '' }],
      preparationSteps: [{ name: '' }, { name: '' }, { name: '' }],
      visibility: '',
    },
    mode: 'all',
  });

  useEffect(() => {
    if (data) {
      methods.reset({
        title: data.title,
        description: data.description,
        categoryName: data.categoryName,
        preparationTime: data.preparationTime,
        imageFile: null,
        imagePreview: data.imageUrl,
        ingredients: data.ingredients.map((ingredient: string) => ({
          name: ingredient,
        })),
        preparationSteps: data.preparationSteps.map((step: string) => ({
          name: step,
        })),
        visibility: data.visibility,
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <NewRecipePageWrapper>
      <FormProvider {...methods}>
        <AddRecipeFormHeader />

        <PageContentWrapper padding={4}>
          <BasicInformation isVisible={stepNumber === 0} />
          <Ingredients isVisible={stepNumber === 1} />
          <PreparationMethod isVisible={stepNumber === 2} />
          <Publication isVisible={stepNumber === 3} />
        </PageContentWrapper>
      </FormProvider>
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
