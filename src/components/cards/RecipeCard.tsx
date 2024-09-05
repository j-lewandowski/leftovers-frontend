import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Rating from '../Rating';
import FavoritesButton from '../buttons/FavoritesButton';

const RecipeCard = () => {
  const navigate = useNavigate();

  return (
    <CardWrapper>
      <StyledCard onClick={() => navigate('/recipes/:id')}>
        <CardMedia
          sx={{ height: '180px' }}
          image="https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <CardContent>
          <Typography variant="subtitle1">
            Grilled Chicken with Roasted Ve...
          </Typography>
          <Typography variant="body2">
            This grilled chicken is a breeze to make and delivers a delicious
            comb...
          </Typography>
          <Rating short rating={5} numberOfRatings={12} />
        </CardContent>
      </StyledCard>
      <FavoritesButton />
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
