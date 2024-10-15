import { ChevronRight } from '@mui/icons-material';
import { Divider, Stack, styled, Typography, useTheme } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API } from '../../assets/constants/api';
import { getPreparationTimeLabel } from '../../features/recipes/recipes';
import Rating from '../recipe/Rating';
import ImageCard from './ImageCard';

const RecipeOfTheDay = () => {
  const theme = useTheme();

  const { data, isPending, isError } = useQuery({
    queryKey: ['recipes', 'recipeOfTheDay'],
    queryFn: async () => {
      const res = await axios.get(API.RECIPES.RECIPE_OF_THE_DAY);
      return res.data;
    },
  });

  if (isError) {
    return <Typography>Something went wrong.</Typography>;
  }

  return (
    <Card direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 1, sm: 2 }}>
      {isPending ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <ImageCard
            recipeId={data.id}
            imageUrl={data.imageUrl}
            isSaved={data.isSaved}
          />
          <RecipeDetails gap={{ xs: 2, sm: 4 }} padding={1}>
            <Stack gap={{ xs: 1, sm: 2 }}>
              <Typography
                variant="overline"
                fontWeight={600}
                color={theme.palette.primary.dark}
              >
                RECIPE OF THE DAY
              </Typography>
              <Rating
                rating={data.rating}
                numberOfRatings={data.numberOfRatings}
              />
              <Typography variant="h5">{data.title}</Typography>
              <Typography variant="body1">{data.description}</Typography>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'start', sm: 'center' }}
              gap={{ xs: 0.5, sm: 1 }}
              divider={<Divider orientation={'vertical'} variant="middle" />}
            >
              <Typography variant="overline" lineHeight={'18px'}>
                PREPARATION TIME:{' '}
                {getPreparationTimeLabel(data.preparationTime)}
              </Typography>
              <Typography variant="overline" lineHeight={'18px'}>
                {data.servings} SERVINGS
              </Typography>
            </Stack>
            <StyledLink to={'/recipes/' + data.id}>
              <Stack direction="row" color={theme.palette.primary.main}>
                <Typography>View the recipe</Typography>
                <ChevronRight />
              </Stack>
            </StyledLink>
          </RecipeDetails>
        </>
      )}
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
