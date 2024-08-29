import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import CategoriesButton from '../buttons/CategoriesButton';
import MyAccountButton from '../buttons/MyAccountButton';

const AuthenticatedUserButtons = () => {
  return (
    <>
      <Button sx={{ gap: '8px' }}>
        <Add />
        Add recipe
      </Button>
      <CategoriesButton />
      <MyAccountButton />
    </>
  );
};

export default AuthenticatedUserButtons;
