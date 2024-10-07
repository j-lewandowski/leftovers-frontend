import { ChevronRight } from '@mui/icons-material';
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
import { ALL_RECIPES_ENDPOINT } from '../assets/constants/api';
import RecipeCard from '../components/cards/RecipeCard';
import RecipeOfTheDay from '../components/cards/RecipeOfTheDay';
import { useAuth } from '../context/AuthContext';
import { Recipe } from '../models/recipe.model';

function HomePage() {
  const { accessToken } = useAuth();
  const { data, isPending } = useQuery({
    queryKey: ['save-recipes', 'recipes'],
    queryFn: async () => {
      const res = await axios.get(ALL_RECIPES_ENDPOINT, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      });
      return res.data;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <HomePageWrapper>
      <RecipeOfTheDay />
      <Stack direction="column" gap={0.5}>
        <Typography variant="h4">New Recipes</Typography>
        <Divider />
      </Stack>
      <Grid container spacing={1.5}>
        {data.map((recipe: Recipe) => (
          <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
            <RecipeCard recipeData={recipe} />
          </Grid>
        ))}
      </Grid>
      <ButtonWrapper>
        <Button variant="contained" size="medium" endIcon={<ChevronRight />}>
          See all recipes
        </Button>
      </ButtonWrapper>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled('main')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'fit-content',
  position: 'relative',
  padding: '2.5rem 3rem',
  backgroundColor: theme.palette.background.default,
  gap: '2.5rem',
}));

const ButtonWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
}));

export default HomePage;
