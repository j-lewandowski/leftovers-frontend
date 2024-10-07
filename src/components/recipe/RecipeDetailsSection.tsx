import { Button, Stack, styled, Typography } from '@mui/material';
import FavoritesButton from '../buttons/FavoritesButton';
import Rating from './Rating';

interface RecipeDetailsSectionProps {
  recipeId: string;
  imageUrl: string;
  rating: number;
  numberOfRatings: number;
  title: string;
  description: string;
  preparationTime: string;
  isSaved: boolean;
}

const RecipeDetailsSection = ({
  recipeId,
  imageUrl,
  rating,
  numberOfRatings,
  title,
  description,
  preparationTime,
  isSaved,
}: RecipeDetailsSectionProps) => {
  return (
    <RecipeDetailsWrapper direction="row" gap={7}>
      <Image src={imageUrl} />
      <Stack gap={2}>
        <SaveRecipeWrapper>
          <FavoritesButton
            recipeId={recipeId}
            isSaved={isSaved}
            isFloatingButton={false}
          />
        </SaveRecipeWrapper>
        <Stack gap={4} sx={{ width: '100%' }}>
          <RateRecipeWrapper>
            <Button variant="text" sx={{ width: 'fit-content' }}>
              Rate the recipe
            </Button>
            <Rating rating={rating} numberOfRatings={numberOfRatings} />
          </RateRecipeWrapper>
          <TitleWrapper>
            <Typography variant="h5">{title}</Typography>
            <Typography variant="body1">{description}</Typography>
          </TitleWrapper>
          <Typography variant="overline">
            PREPARATION TIME: {preparationTime}
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
