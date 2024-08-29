import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SigninModal from '../modals/SigninModal';

const SigninButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button size="medium" onClick={() => navigate('?signin=true')}>
        <Typography>Log in</Typography>
      </Button>
      <SigninModal />
    </>
  );
};

export default SigninButton;
