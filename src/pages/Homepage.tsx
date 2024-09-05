import { ChevronRight } from '@mui/icons-material';
import {
  Button,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import RecipeCard from '../components/cards/RecipeCard';
import RecipeOfTheDay from '../components/cards/RecipeOfTheDay';

function HomePage() {
  return (
    <HomePageWrapper>
      <RecipeOfTheDay />
      <Stack direction="column" gap={0.5}>
        <Typography variant="h4">New Recipes</Typography>
        <Divider />
      </Stack>
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <RecipeCard />
        </Grid>
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
