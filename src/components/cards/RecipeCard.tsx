import { Edit, Lock } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Visibility } from '../../assets/constants/enums';
import { Recipe } from '../../models/recipe.model';
import FavoritesButton from '../buttons/FavoritesButton';
import Rating from '../recipe/Rating';

const RecipeCard = ({ recipeData }: { recipeData: Recipe }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isMyRecipesPage = searchParams.get('myRecipes') == 'true';

  return (
    <CardWrapper>
      <StyledCard onClick={() => navigate('/recipes/' + recipeData.id)}>
        <CardMedia sx={{ height: '180px' }} image={recipeData.imageUrl}>
          {recipeData.visibility === Visibility.Private && isMyRecipesPage && (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0,0,0,0.48)',
                color: 'white',
              }}
            >
              <Lock />
              <Typography>Private</Typography>
            </Stack>
          )}
        </CardMedia>
        <CardContent>
          <Typography variant="subtitle1">{recipeData.title}</Typography>
          <Description variant="body2">{recipeData.description}</Description>
          <Rating
            oneStar
            rating={recipeData.rating}
            numberOfRatings={recipeData.numberOfRatings}
          />
        </CardContent>
        {isMyRecipesPage && (
          <CardActions>
            <Button endIcon={<Edit />}>Edit the recipe</Button>
          </CardActions>
        )}
      </StyledCard>
      <FavoritesButton isSaved={recipeData.isSaved} recipeId={recipeData.id} />
    </CardWrapper>
  );
};

export default RecipeCard;

const StyledCard = styled(Card)(() => ({
  minWidth: '100%',
  cursor: 'pointer',
}));

const CardWrapper = styled('div')(() => ({
  position: 'relative',
}));

const Description = styled(Typography)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;
