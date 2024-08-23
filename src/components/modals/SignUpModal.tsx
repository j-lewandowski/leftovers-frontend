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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

export interface FormInputValues {
  email: string;
  password: string;
  acceptTC: boolean;
}

const SignUpModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { handleSubmit, control, register, formState } =
    useForm<FormInputValues>({
      defaultValues: {
        email: '',
        password: '',
        acceptTC: false,
      },
      mode: 'onChange',
    });
  const onSubmit = (data: FormInputValues) => {
    console.log(data);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <DialogContainer open={isOpen} onClose={onClose} fullWidth>
      <CloseDialogContainer>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </CloseDialogContainer>
      <Title>
        <Typography variant="h4">Sign up</Typography>
      </Title>
      <Content>
        <Typography variant="body2">Create an account for free</Typography>
      </Content>
      <Content>
        <EmailInput control={control} name="email" />
      </Content>
      <Content>
        <PasswordInput control={control} name="password" />
      </Content>
      <Content>
        <FormControlLabel
          control={<Checkbox {...register('acceptTC', { required: true })} />}
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
          onClick={handleSubmit(onSubmit)}
          disabled={!formState.isValid || formState.isSubmitted}
        >
          {formState.isSubmitted ? <Spinner /> : 'Create an account'}
        </Button>
      </SubmitContainer>
      <Content>
        <Typography variant="body2">
          Already have an account? <LoginLink to="/sign-in">Login</LoginLink>
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

export default SignUpModal;
