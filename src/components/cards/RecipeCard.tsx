import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../../models/recipe.model';
import FavoritesButton from '../buttons/FavoritesButton';
import Rating from '../recipe/Rating';

const RecipeCard = ({ recipeData }: { recipeData: Recipe }) => {
  const navigate = useNavigate();

  return (
    <CardWrapper>
      <StyledCard onClick={() => navigate('/recipes/' + recipeData.id)}>
        <CardMedia sx={{ height: '180px' }} image={recipeData.imageUrl} />
        <CardContent>
          <Typography variant="subtitle1">{recipeData.title}</Typography>
          <Description variant="body2">{recipeData.description}</Description>
          <Rating
            oneStar
            rating={+recipeData.rating}
            numberOfRatings={recipeData.numberOfRatings}
          />
        </CardContent>
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
