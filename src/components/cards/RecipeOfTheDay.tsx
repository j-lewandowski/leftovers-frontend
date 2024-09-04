import { ChevronRight } from '@mui/icons-material';
import { Divider, Stack, styled, Typography, useTheme } from '@mui/material';
import Rating from '../Rating';
import ImageCard from './ImageCard';

const RecipeOfTheDay = () => {
  const theme = useTheme();

  return (
    <Card direction="row" gap={2}>
      <ImageCard />
      <RecipeDetails gap={4} padding={'1rem'}>
        <Stack gap={2}>
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
          direction="row"
          alignItems="center"
          gap={'1rem'}
          divider={<Divider orientation="vertical" variant="middle" />}
        >
          <Typography variant="overline" lineHeight={'18px'}>
            PREPARATION TIME: 40 MINUTES
          </Typography>
          <Typography variant="overline" lineHeight={'18px'}>
            4 SERVINGS
          </Typography>
        </Stack>
        <Stack direction="row" color={theme.palette.primary.main}>
          <Typography>View the recipe</Typography>
          <ChevronRight />
        </Stack>
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
}));

const RecipeDetails = styled(Stack)(() => ({
  width: '100%',
}));
