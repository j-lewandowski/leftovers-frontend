import { Close } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import EmailInput from '../inputs/EmailInput';

const ForgotPasswordModal = () => {
  const [searchParams] = useSearchParams();
  const { form, onClose, forgotPasswordMutation } = useForgotPassword();

  return (
    <DialogContainer
      open={!!searchParams.get('forgot-password')}
      onClose={onClose}
    >
      <CloseDialogContainer>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </CloseDialogContainer>
      <Title>Forgot password</Title>
      <Content>
        <Typography variant="body2">
          No worries! Enter your email address below, and we'll send you a link
          to reset your password.
        </Typography>
      </Content>
      <Content>
        <EmailInput control={form.control} name={'email'} />
      </Content>
      <SubmitContainer>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!form.formState.isValid || forgotPasswordMutation.isPending}
          onClick={form.handleSubmit(async (data) =>
            forgotPasswordMutation.mutate(data),
          )}
        >
          {forgotPasswordMutation.isPending ? (
            <Spinner size="1.5rem" />
          ) : (
            'Send e-mail'
          )}
        </Button>
      </SubmitContainer>
    </DialogContainer>
  );
};

export default ForgotPasswordModal;

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

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.action.disabled,
}));
