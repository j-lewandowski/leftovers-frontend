import { Stack, styled, Typography } from '@mui/material';
import { getPreparationTimeLabel } from '../../features/recipes/recipes';
import { Recipe } from '../../models/recipe.model';
import FavoritesButton from '../buttons/FavoritesButton';
import RateRecipeButton from '../buttons/RateRecipeButton';
import Rating from './Rating';

const RecipeDetailsSection = ({ data }: { data: Recipe }) => {
  const {
    imageUrl,
    id,
    isSaved,
    rating,
    numberOfRatings,
    title,
    description,
    preparationTime,
  } = data;
  return (
    <RecipeDetailsWrapper direction="row" gap={7}>
      <Image src={imageUrl} />
      <Stack gap={2} sx={{ width: '100%' }}>
        <SaveRecipeWrapper>
          <FavoritesButton
            recipeId={id}
            isSaved={isSaved}
            isFloatingButton={false}
          />
        </SaveRecipeWrapper>
        <Stack gap={4}>
          <RateRecipeWrapper>
            <RateRecipeButton />
            <Rating rating={rating} numberOfRatings={numberOfRatings} />
          </RateRecipeWrapper>
          <TitleWrapper>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{description}</Typography>
          </TitleWrapper>
          <Typography variant="overline">
            PREPARATION TIME: {getPreparationTimeLabel(preparationTime)}
          </Typography>
        </Stack>
      </Stack>
    </RecipeDetailsWrapper>
  );
};

export default RecipeDetailsSection;

const RecipeDetailsWrapper = styled(Stack)({
  width: '100%',
  minWidth: '100%',
});

const Image = styled('img')({
  aspectRatio: '1 / 1',
  borderRadius: '4px',
});

const SaveRecipeWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'end',
});

const RateRecipeWrapper = styled(Stack)({
  width: '100%',
});

const TitleWrapper = styled('div')({
  width: '100%',
});
