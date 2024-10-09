import { FilterList, ImportExport } from '@mui/icons-material';
import {
  Button,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { API } from '../assets/constants/api';
import RecipeCard from '../components/cards/RecipeCard';
import { useAuth } from '../context/AuthContext';
import { Recipe } from '../models/recipe.model';

const RecipesList = () => {
  const [params] = useSearchParams();
  const { accessToken } = useAuth();

  const { data } = useQuery({
    queryKey: ['save-recipes', 'recipes'],
    queryFn: async () => {
      const res = await axios.get(API.RECIPES.ALL, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      return res.data;
    },
  });

  return (
    <Wrapper gap={2}>
      <Stack gap={1}>
        <Typography variant="h5" sx={{ paddingBottom: '.5rem' }}>
          {!params.get('category') ? 'All Recipes' : params.get('category')}
        </Typography>
        <Divider />
      </Stack>
      <Stack direction="row" spacing={1}>
        {!params.get('category') && (
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<FilterList />}
          >
            Filters
          </Button>
        )}
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ImportExport />}
        >
          Rating
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<ImportExport />}
        >
          Date
        </Button>
      </Stack>
      <Grid container spacing={1.5}>
        {data.map((recipe: Recipe) => (
          <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
            <RecipeCard recipeData={recipe} />
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
