import { Button, Typography } from '@mui/material';
import CategoriesButton from '../buttons/CategoriesButton';
import SignupButton from '../buttons/SignupButton';

const UnauthenticatedUserButtons = () => {
  return (
    <>
      <CategoriesButton />
      <Button size="medium">
        <Typography>Log in</Typography>
      </Button>
      <SignupButton />
    </>
  );
};

export default UnauthenticatedUserButtons;
