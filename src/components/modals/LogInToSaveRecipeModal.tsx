import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogInToSaveRecipeModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const onLogin = () => {
    onClose();
    navigate('?signin=true');
  };

  return (
    <DialogContainer open={isOpen} onClose={onClose}>
      <Title>Login to save the recipe</Title>
      <Content>
        <Typography variant="body1">
          If you want to save this recipe you need to login or create an
          account. Don't miss out on the convenience of having your favorite
          recipes at your fingertips whenever you crave them!
        </Typography>
      </Content>
      <SubmitContainer>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={onLogin}>
          Login
        </Button>
      </SubmitContainer>
    </DialogContainer>
  );
};

export default LogInToSaveRecipeModal;

const DialogContainer = styled(Dialog)(() => ({
  minWidth: '600px',
}));

const Title = styled(DialogTitle)(() => ({
  padding: '1rem 1.5rem',
}));

const Content = styled(DialogContent)(() => ({
  padding: '0 1.5rem 2rem 1.5rem',
  overflow: 'visible',
}));

const SubmitContainer = styled(DialogActions)(() => ({
  padding: '0.5rem 1.5rem 1.5rem 1.5rem',
}));
