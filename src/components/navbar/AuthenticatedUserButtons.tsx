import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoriesButton from '../buttons/CategoriesButton';
import MyAccountButton from '../buttons/MyAccountButton';

const AuthenticatedUserButtons = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button sx={{ gap: '8px' }} onClick={() => navigate('/new-recipe')}>
        <Add />
        Add recipe
      </Button>
      <CategoriesButton />
      <MyAccountButton />
    </>
  );
};

export default AuthenticatedUserButtons;
