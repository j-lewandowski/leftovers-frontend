import { Box, Stack, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ALL_RECIPES_ENDPOINT } from '../assets/constants/api';
import RecipeDetailsSection from '../components/recipe/RecipeDetailsSection';
import RecipePreparationDetails from '../components/recipe/RecipePreparationDetails';
import { getPreparationTimeLabel } from '../features/recipes/recipes';

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['save-recipes', 'recipe'],
    queryFn: async () => {
      const res = await axios.get(ALL_RECIPES_ENDPOINT + recipeId);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <RecipeDetailsWrapper>
      <RecipeCard>
        <Stack gap={2} sx={{ width: '100%', minWidth: '100%' }}>
          <RecipeDetailsSection
            imageUrl={data.imageUrl}
            title={data.title}
            description={data.description}
            rating={data.rating}
            numberOfRatings={data.numberOfRatings}
            preparationTime={getPreparationTimeLabel(data.preparationTime)}
            recipeId={data.id}
            isSaved={data.isSaved}
          />
          <RecipePreparationDetails
            ingredients={data.ingredients}
            preparationSteps={data.preparationSteps}
          />
        </Stack>
      </RecipeCard>
    </RecipeDetailsWrapper>
  );
};

export default RecipeDetails;

const RecipeDetailsWrapper = styled(Box)(({ theme }) => ({
  height: '100dvh',
  padding: '1rem 12rem',
  backgroundColor: theme.palette.background.default,
}));

const RecipeCard = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100%',
  borderRadius: '.5rem',
  padding: '2rem',
  backgroundColor: theme.palette.common.white,
}));
