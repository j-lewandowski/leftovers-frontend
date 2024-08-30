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
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { useSignUp } from '../../hooks/useSignUp';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

const SignupModal = () => {
  const [searchParams] = useSearchParams();
  const { form, mutation, onClose } = useSignUp();

  return (
    <>
      <DialogContainer
        open={!!searchParams.get('signup')}
        onClose={onClose}
        fullWidth
      >
        <CloseDialogContainer>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </CloseDialogContainer>
        <Title variant="h4">Sign up</Title>
        <Content>
          <Typography variant="body2">Create an account for free</Typography>
        </Content>
        <Content>
          <EmailInput control={form.control} name="email" />
        </Content>
        <Content>
          <PasswordInput control={form.control} name="password" />
        </Content>
        <Content>
          <FormControlLabel
            control={
              <Checkbox {...form.register('acceptTC', { required: true })} />
            }
            labelPlacement="end"
            label={
              <Typography>
                Acceptance of{' '}
                <TermsAndConditionsLink target="_blank">
                  Terms & Conditions and Privacy Policy*
                </TermsAndConditionsLink>
              </Typography>
            }
          />
        </Content>
        <SubmitContainer>
          <Button
            variant="contained"
            size="medium"
            onClick={form.handleSubmit(async (data) => mutation.mutate(data))}
            disabled={!form.formState.isValid || mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : 'Create an account'}
          </Button>
        </SubmitContainer>
        <Content>
          <Typography variant="body2">
            Already have an account?{' '}
            <LoginLink to="?signin=true">Login</LoginLink>
          </Typography>
        </Content>
      </DialogContainer>
    </>
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

const Content = styled(DialogContent)(() => ({
  padding: '0 1.5rem 2rem 1.5rem',
  overflow: 'visible',
}));

const TermsAndConditionsLink = styled('a')(() => ({
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 500,
}));

const SubmitContainer = styled(DialogActions)(() => ({
  justifyContent: 'start',
  padding: '0.5rem 1.5rem 1.5rem 1.5rem',
}));

const LoginLink = styled(Link)(() => ({
  textDecoration: 'underline',
  color: 'inherit',
}));

const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.action.disabled,
}));

export default SignupModal;
