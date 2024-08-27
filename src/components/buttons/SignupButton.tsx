import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignupModal from '../modals/SignupModal';

const SignupButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        variant="contained"
        size="medium"
        onClick={() => navigate('?signup=true')}
      >
        <Typography>Sign up</Typography>
      </Button>
      <SignupModal />
    </>
  );
};

export default SignupButton;
