import { Box, Stack, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RecipeDetailsSection from '../components/recipe/RecipeDetailsSection';
import RecipePreparationDetails from '../components/recipe/RecipePreparationDetails';
import { Recipe } from '../types';

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['recipe'],
    queryFn: async () => {
      const res = await axios.get('/recipes/' + recipeId);
      return res.data as Recipe;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <RecipeDetailsWrapper>
      <RecipeCard>
        <Stack gap={2} sx={{ width: '100%' }}>
          <RecipeDetailsSection
            imageUrl={data!.imageUrl}
            title={data!.title}
            description={data!.description}
            rating={data!.rating}
            numberOfRatings={data!.numberOfRatings}
            preparationTime={data!.preparationTime}
          />
          <RecipePreparationDetails
            ingredients={data!.ingredients}
            preparationSteps={data!.preparationSteps}
          />
        </Stack>
      </RecipeCard>
    </RecipeDetailsWrapper>
  );
};

export default RecipeDetails;

const RecipeDetailsWrapper = styled(Box)(({ theme }) => ({
  height: 'fit-content',
  padding: '1rem 12rem',
  backgroundColor: theme.palette.background.default,
}));

const RecipeCard = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '.5rem',
  padding: '2rem',
  backgroundColor: theme.palette.common.white,
}));
