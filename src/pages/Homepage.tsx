import { ChevronRight } from '@mui/icons-material';
import {
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  styled,
  Typography,
  Zoom,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../assets/constants/api';
import RecipeCard from '../components/cards/RecipeCard';
import RecipeOfTheDay from '../components/cards/RecipeOfTheDay';
import { Recipe } from '../models/recipe.model';
import httpService from '../services/http.service';

function HomePage() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: async () => {
      const res = await httpService.get(API.RECIPES.ALL, {
        params: { limit: 8 },
      });
      return res.data.recipes;
    },
  });

  return (
    <HomePageWrapper>
      <RecipeOfTheDay />
      <Stack direction="column" gap={0.5}>
        <Typography variant="h4">New Recipes</Typography>
        <Divider />
      </Stack>
      <Grid container spacing={1.5}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <RecipeCardSkeleton animation="wave" />
              </Grid>
            ))
          : data.map((recipe: Recipe, index: number) => (
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Grid key={recipe.id} item xs={12} sm={6} md={4} lg={3}>
                  <RecipeCard recipeData={recipe} />
                </Grid>
              </Zoom>
            ))}
      </Grid>
      <ButtonWrapper>
        <Button
          variant="contained"
          size="medium"
          endIcon={<ChevronRight />}
          onClick={() => navigate('/recipes')}
        >
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

const RecipeCardSkeleton = styled(Skeleton)({
  height: '450px',
  width: '100%',
});

export default HomePage;
