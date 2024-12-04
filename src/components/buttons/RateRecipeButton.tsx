import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RateRecipeModal from '../modals/RateRecipeModal';

const RateRecipeButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Button
        variant="text"
        sx={{ width: 'fit-content' }}
        onClick={() => {
          if (isAuthenticated) {
            navigate('?rate-recipe=true');
          } else {
            navigate('?signin=true');
          }
        }}
      >
        Rate the recipe
      </Button>
      <RateRecipeModal />
    </>
  );
};

export default RateRecipeButton;
