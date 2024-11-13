import {
  Box,
  Divider,
  Grid,
  Grow,
  Stack,
  styled,
  Typography,
  Zoom,
} from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API } from '../assets/constants/api';
import FilterButton from '../components/buttons/FilterButton';
import SortingButton from '../components/buttons/SortingButton';
import RecipeCard from '../components/cards/RecipeCard';
import { usePageLabel } from '../hooks/usePageLabel';
import { Recipe } from '../models/recipe.model';
import httpService from '../services/http.service';

const RecipesList = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const { label } = usePageLabel();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ['recipes', searchParams.toString()],
    });
  }, [searchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ['recipes', searchParams.toString()],
    queryFn: async () => {
      const res = await httpService.get(API.RECIPES.ALL, {
        params: {
          category: searchParams.getAll('category'),
          saved: searchParams.get('saved'),
          sort: searchParams.get('sort'),
          myRecipes: searchParams.get('myRecipes'),
          title: searchParams.get('search'),
          description: searchParams.get('search'),
        },
      });
      return res.data.recipes;
    },
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Wrapper gap={2}>
      <Stack gap={1}>
        {searchParams.get('search') && (
          <Typography variant="body2" color="secondary">
            Search results for
          </Typography>
        )}
        <Typography variant="h5" sx={{ paddingBottom: '.5rem' }}>
          {label}
        </Typography>
        <Divider />
      </Stack>
      <Stack direction="row" spacing={1}>
        {label === 'All Recipes' && (
          <Zoom in={true} style={{ transitionDelay: '100ms' }}>
            <Box>
              <FilterButton name="Filters"></FilterButton>
            </Box>
          </Zoom>
        )}
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <Box>
            <SortingButton
              name="Rating"
              fieldName="rating"
              descOptionName="Highest score first"
              ascOptionName="Lowest score first"
            />
          </Box>
        </Zoom>
        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Box>
            <SortingButton
              name="Date"
              fieldName="date"
              descOptionName="Sort by newest"
              ascOptionName="Sort by oldest"
            />
          </Box>
        </Zoom>
      </Stack>
      <Grid container spacing={1.5}>
        {data.map((recipe: Recipe, index: number) => (
          <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
            <Grow in={true} style={{ transitionDelay: `${index * 100}ms` }}>
              <Box>
                <RecipeCard recipeData={recipe} />
              </Box>
            </Grow>
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default RecipesList;

const Wrapper = styled(Stack)(({ theme }) => ({
  minHeight: '100dvh',
  background: theme.palette.background.default,
  padding: '2.5rem 3rem',
}));
