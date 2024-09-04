import { styled } from '@mui/material';
import RecipeOfTheDay from '../components/cards/RecipeOfTheDay';

function HomePage() {
  return (
    <HomePageWrapper>
      <RecipeOfTheDay />
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled('main')(({ theme }) => ({
  width: '100%',
  height: '100dvh',
  position: 'relative',
  padding: '2.5rem 3rem',
  backgroundColor: theme.palette.background.default,
}));

export default HomePage;
