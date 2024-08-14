import { Button, Typography } from '@mui/material';
import CategoriesButton from '../buttons/CategoriesButton';

const UnauthenticatedUserButtons = () => {
  return (
    <>
      <CategoriesButton />
      <Button size="medium">
        <Typography>Log in</Typography>
      </Button>
      <Button variant="contained" size="medium">
        <Typography>Sign up</Typography>
      </Button>
    </>
  );
};

export default UnauthenticatedUserButtons;
