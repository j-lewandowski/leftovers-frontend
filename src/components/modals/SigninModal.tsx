import { Close } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useSignIn } from '../../hooks/useSignIn';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

const SigninModal = () => {
  const [searchParams] = useSearchParams();
  const { form, signInMutation, onClose } = useSignIn();

  return (
    <DialogContainer
      open={!!searchParams.get('signin')}
      onClose={onClose}
      fullWidth
    >
      <CloseDialogContainer>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </CloseDialogContainer>
      <Title variant="h4">Log in</Title>
      <Content>
        <EmailInput control={form.control} name="email" />
      </Content>
      <Content>
        <PasswordInput control={form.control} name="password" />
        <Link to="?reset-password=true">
          <Helper>Forgot your password?</Helper>
        </Link>
      </Content>

      <SubmitContainer>
        <Button
          variant="contained"
          size="medium"
          onClick={form.handleSubmit(async (data) =>
            signInMutation.mutate(data),
          )}
          disabled={!form.formState.isValid || signInMutation.isPending}
        >
          {signInMutation.isPending ? <Spinner /> : 'Log in'}
        </Button>
      </SubmitContainer>
      <Content>
        <FormControlLabel
          control={
            <Checkbox {...form.register('rememberMe', { required: false })} />
          }
          labelPlacement="end"
          label={<Typography variant="body2">Remember me</Typography>}
        />
      </Content>
      <Content>
        <Typography variant="body2">
          Don't have an account yet?{' '}
          <SignInLink to="?signup=true">Create an account</SignInLink>
        </Typography>
      </Content>
    </DialogContainer>
  );
};

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

const Helper = styled(FormHelperText)(() => ({
  float: 'right',
  marginRight: '0',
}));

const Content = styled(DialogContent)(() => ({
  padding: '0 1.5rem 2rem 1.5rem',
  overflow: 'visible',
}));

const SubmitContainer = styled(DialogActions)(() => ({
  justifyContent: 'start',
  padding: '0.5rem 1.5rem 1.5rem 1.5rem',
}));

const SignInLink = styled(Link)(() => ({
  textDecoration: 'underline',
  color: 'inherit',
}));

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.action.disabled,
}));

export default SigninModal;
