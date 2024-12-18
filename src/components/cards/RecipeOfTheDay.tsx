import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  Divider,
  Fade,
  Skeleton,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { API } from '../../assets/constants/api';
import { getPreparationTimeLabel } from '../../features/recipes/recipes';
import httpService from '../../services/http.service';
import Rating from '../recipe/Rating';
import ImageCard from './ImageCard';

const RecipeOfTheDay = () => {
  const theme = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ['save-recipes', 'recipes', 'recipeOfTheDay'],
    queryFn: async () => {
      const res = await httpService.get(API.RECIPES.RECIPE_OF_THE_DAY);
      return res.data;
    },
  });

  return (
    <Fade in={true}>
      <Box>
        <Card direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 1, sm: 2 }}>
          {isLoading ? (
            <>
              <ImageSkeleton variant="rounded" />
              <RecipeDetails gap={{ xs: 2, sm: 4 }} padding={1}>
                <Stack gap={{ xs: 1, sm: 2 }}>
                  <Typography
                    variant="overline"
                    fontWeight={600}
                    color={theme.palette.primary.dark}
                  >
                    RECIPE OF THE DAY
                  </Typography>
                  <RatingSkeleton variant="text" />
                  <TitleSkeleton variant="text" />
                  <DescriptionSkeleton variant="text" />
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems={{ xs: 'start', sm: 'center' }}
                  gap={{ xs: 0.5, sm: 1 }}
                  divider={
                    <Divider orientation={'vertical'} variant="middle" />
                  }
                >
                  <AdditionalDataSkeleton variant="text" />
                  <AdditionalDataSkeleton variant="text" />
                </Stack>
                <LinkSkeleton variant="text" />
              </RecipeDetails>
            </>
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
                  divider={
                    <Divider orientation={'vertical'} variant="middle" />
                  }
                >
                  <Typography variant="overline" lineHeight={'18px'}>
                    PREPARATION TIME:{' '}
                    {getPreparationTimeLabel(data.preparationTime)}
                  </Typography>
                  <Typography variant="overline" lineHeight={'18px'}>
                    {data.servings} SERVINGS
                  </Typography>
                </Stack>
                <StyledLink to={'/recipes/' + data.id} data-cy="view-recipe">
                  <Stack direction="row" color={theme.palette.primary.main}>
                    <Typography>View the recipe</Typography>
                    <ChevronRight />
                  </Stack>
                </StyledLink>
              </RecipeDetails>
            </>
          )}
        </Card>
      </Box>
    </Fade>
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

const ImageSkeleton = styled(Skeleton)({
  minHeight: '300px',
  width: '100%',
});

const RatingSkeleton = styled(Skeleton)({
  width: '200px',
  fontSize: '1.5rem',
});

const TitleSkeleton = styled(Skeleton)({
  fontSize: '1.5rem',
  width: '100%',
});

const DescriptionSkeleton = styled(Skeleton)({
  fontSize: '1rem',
  width: '100%',
  height: '20px',
});

const AdditionalDataSkeleton = styled(Skeleton)({
  width: '100px',
  fontsize: '0.75rem',
});

const LinkSkeleton = styled(Skeleton)({
  width: '120px',
  fontSize: '1rem',
});
