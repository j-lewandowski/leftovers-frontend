import { Divider, Grid, Stack, styled, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API } from '../assets/constants/api';
import FilterButton from '../components/buttons/FilterButton';
import SortingButton from '../components/buttons/SortingButton';
import RecipeCard from '../components/cards/RecipeCard';
import { useAuth } from '../context/AuthContext';
import { usePageLabel } from '../hooks/usePageLabel';
import { Recipe } from '../models/recipe.model';

const RecipesList = () => {
  const [searchParams] = useSearchParams();
  const { accessToken } = useAuth();
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
      const res = await axios.get(API.RECIPES.ALL, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        params: {
          category: searchParams.getAll('category'),
          saved: searchParams.get('saved'),
          sort: searchParams.get('sort'),
          myRecipes: searchParams.get('myRecipes'),
        },
      });
      return res.data;
    },
  });

  return (
    <Wrapper gap={2}>
      <Stack gap={1}>
        <Typography variant="h5" sx={{ paddingBottom: '.5rem' }}>
          {label}
        </Typography>
        <Divider />
      </Stack>
      <Stack direction="row" spacing={1}>
        {label === 'All Recipes' && (
          <FilterButton name="Filters"></FilterButton>
        )}
        <SortingButton
          name="Rating"
          fieldName="rating"
          descOptionName="Highest score first"
          ascOptionName="Lowest score first"
        />
        <SortingButton
          name="Date"
          fieldName="date"
          descOptionName="Sort by newest"
          ascOptionName="Sort by oldest"
        />
      </Stack>
      <Grid container spacing={1.5}>
        {isLoading ? (
          <Grid item> Loading... </Grid>
        ) : (
          data.map((recipe: Recipe) => (
            <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
              <RecipeCard recipeData={recipe} />
            </Grid>
          ))
        )}
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
