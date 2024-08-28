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
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import CustomSnackbar from '../CustomSnackbar';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

export interface FormInputValues {
  email: string;
  password: string;
  acceptTC: boolean;
}

interface ErrorReponse {
  message: string | string[];
}

const SignupModal = () => {
  const { handleSubmit, control, register, formState, reset } =
    useForm<FormInputValues>({
      defaultValues: {
        email: '',
        password: '',
        acceptTC: false,
      },
      mode: 'onChange',
    });
  const mutation = useMutation({
    onSuccess: (res) => {
      setMessage(res.data.message);
      onClose();
    },
    onError: (error: AxiosError<ErrorReponse>) => {
      if (!error.response) {
        setMessage('Unknown error');
        return;
      }

      if (error.response.status === 400) {
        setMessage(error.response.data.message[0]);
      }

      setMessage(error.response.data.message as string);
    },
    mutationFn: (userData: FormInputValues) => {
      return axios.post('/auth/register', {
        email: userData.email,
        password: userData.password,
      });
    },
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  const onClose = () => {
    reset();
    navigate(-1);
  };

  return (
    <>
      <CustomSnackbar
        message={message}
        handleClose={() => {
          setMessage('');
        }}
      />

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
            onClick={handleSubmit(async (data) => mutation.mutate(data))}
            disabled={!formState.isValid || mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : 'Create an account'}
          </Button>
        </SubmitContainer>
        <Content>
          <Typography variant="body2">
            Already have an account? <LoginLink to="/sign-in">Login</LoginLink>
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
