import { Button } from '@mui/material';
import MyAccountButton from '../buttons/MyAccountButton';
import CategoriesButton from '../buttons/CategoriesButton';

const AuthenticatedUserButtons = () => {
  return (
    <>
      <Button>Add recipe</Button>
      <CategoriesButton />
      <MyAccountButton />
    </>
  );
};

export default AuthenticatedUserButtons;
