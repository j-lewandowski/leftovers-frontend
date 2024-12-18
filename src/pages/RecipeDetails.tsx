import { Box, Skeleton, Stack, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { API } from '../assets/constants/api';
import RecipeDetailsSection from '../components/recipe/RecipeDetailsSection';
import RecipePreparationDetails from '../components/recipe/RecipePreparationDetails';
import httpService from '../services/http.service';

const RecipeDetails = () => {
  const { recipeId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['save-recipes', 'recipes', 'recipe'],
    queryFn: async () => {
      const res = await httpService.get(API.RECIPES.ALL + recipeId);
      return res.data;
    },
  });

  return (
    <RecipeDetailsWrapper>
      {isLoading ? (
        <RecipeDetailsSkeleton variant="rounded" animation="wave" />
      ) : (
        <RecipeCard>
          <Stack gap={2} sx={{ width: '100%', minWidth: '100%' }}>
            <RecipeDetailsSection data={data} />
            <RecipePreparationDetails data={data} />
          </Stack>
        </RecipeCard>
      )}
    </RecipeDetailsWrapper>
  );
};

export default RecipeDetails;

const RecipeDetailsWrapper = styled(Box)(({ theme }) => ({
  height: '100dvh',
  padding: '1rem 12rem',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  justifyContent: 'center',
}));

const RecipeCard = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1072px',
  minHeight: '100%',
  borderRadius: '.5rem',
  padding: '2rem',
  backgroundColor: theme.palette.common.white,
}));

const RecipeDetailsSkeleton = styled(Skeleton)({
  width: '100%',
  height: '100%',
});
