import { ChevronRight } from '@mui/icons-material';
import { Divider, Stack, styled, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import ImageCard from './ImageCard';

const RecipeOfTheDay = () => {
  const theme = useTheme();

  return (
    <Card direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 1, sm: 2 }}>
      <ImageCard imageUrl="https://plus.unsplash.com/premium_photo-1661767136966-38d5999f819a?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <RecipeDetails gap={{ xs: 2, sm: 4 }} padding={1}>
        <Stack gap={{ xs: 1, sm: 2 }}>
          <Typography
            variant="overline"
            fontWeight={600}
            color={theme.palette.primary.dark}
          >
            RECIPE OF THE DAY
          </Typography>
          <Rating rating={5.0} numberOfRatings={150} />
          <Typography variant="h5">
            Grilled Chciken with Roasted Vegetables
          </Typography>
          <Typography variant="body1">
            This grilled chicken is a breeze to make and delivers a delicious
            combo of flavors. Start by marinating chicken in a mix of zesty
            lemon, aromatic herbs, and garlic.
          </Typography>
        </Stack>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'start', sm: 'center' }}
          gap={{ xs: 0.5, sm: 1 }}
          divider={<Divider orientation={'vertical'} variant="middle" />}
        >
          <Typography variant="overline" lineHeight={'18px'}>
            PREPARATION TIME: 40 MINUTES
          </Typography>
          <Typography variant="overline" lineHeight={'18px'}>
            4 SERVINGS
          </Typography>
        </Stack>
        <StyledLink to="/recipes/:id">
          <Stack direction="row" color={theme.palette.primary.main}>
            {/* @TODO - add navigation to real id */}

            <Typography>View the recipe</Typography>
            <ChevronRight />
          </Stack>
        </StyledLink>
      </RecipeDetails>
    </Card>
  );
};

export default RecipeOfTheDay;

const Card = styled(Stack)(({ theme }) => ({
  padding: '2rem',
  backgroundColor: theme.palette.common.white,
  width: '100%',
  borderRadius: '.5rem',

  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
  },
}));

const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
}));

const RecipeDetails = styled(Stack)(() => ({
  width: '100%',
}));
