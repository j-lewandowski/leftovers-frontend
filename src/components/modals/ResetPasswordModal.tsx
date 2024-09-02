import { Close } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import PasswordInput from '../inputs/PasswordInput';

const ResetPasswordModal = () => {
  const [searchParams] = useSearchParams();

  // @TODO - move form logic to custom hook
  const { control } = useForm();

  return (
    <DialogContainer open={!!searchParams.get('reset-password')}>
      <CloseDialogContainer>
        <IconButton>
          <Close />
        </IconButton>
      </CloseDialogContainer>
      <Title>New password</Title>
      <Content>
        <Typography>
          Please ensure your password is a minimum of 8 characters long.
          Ideally, include a mix of both letters and numbers.
        </Typography>
      </Content>
      <Content>
        <PasswordInput
          label="New password*"
          placeholder="Type new password"
          name="newPassword"
          control={control}
        />
      </Content>
      <Content>
        <PasswordInput
          label="Repeat new password*"
          placeholder="Type new password again"
          name="newPassword"
          control={control}
        />
      </Content>
      <SubmitContainer>
        <Button variant="outlined">Cancel</Button>
        <Button variant="contained">Reset my password</Button>
      </SubmitContainer>
    </DialogContainer>
  );
};

export default ResetPasswordModal;

const DialogContainer = styled(Dialog)(() => ({
  minWidth: '500px',
}));

const CloseDialogContainer = styled(DialogContent)(() => ({
  justifyContent: 'end',
  display: 'flex',
  padding: '1rem 1.5rem 0 1.5rem',
}));

const Title = styled(DialogTitle)(() => ({
  padding: '0 1.5rem 1rem 1.5rem',
}));

const Content = styled(DialogContent)(() => ({
  padding: '0 1.5rem 2rem 1.5rem',
  overflow: 'visible',
}));

const SubmitContainer = styled(DialogActions)(() => ({
  padding: '0.5rem 1.5rem 1.5rem 1.5rem',
}));
