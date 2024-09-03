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
import { useSearchParams } from 'react-router-dom';
import { useResetPassword } from '../../hooks/useResetPassword';
import PasswordInput from '../inputs/PasswordInput';

const ResetPasswordModal = () => {
  const [searchParams] = useSearchParams();

  const { form, resetPasswordMutation, onClose } = useResetPassword();
  return (
    <DialogContainer
      open={
        !!searchParams.get('reset-password') && !!searchParams.get('requestId')
      }
      onClose={onClose}
    >
      <CloseDialogContainer>
        <IconButton onClick={onClose}>
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
          control={form.control}
          rules={{
            required: true,
            validate: (value: string) => {
              return form.watch('repeatNewPassword') === value;
            },
          }}
        />
      </Content>
      <Content>
        <PasswordInput
          label="Repeat new password*"
          placeholder="Type new password again"
          name="repeatNewPassword"
          control={form.control}
          rules={{
            required: true,
            validate: (value: string) => {
              return form.watch('newPassword') === value;
            },
          }}
        />
      </Content>
      <SubmitContainer>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(async (data) =>
            resetPasswordMutation.mutate(data),
          )}
        >
          Reset my password
        </Button>
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
