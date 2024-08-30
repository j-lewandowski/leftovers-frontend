import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../context/SnackbarContext';
import { SignupFormInput } from '../types';

interface ErrorReponse {
  message: string | string[];
}

export const useSignUp = () => {
  const navigate = useNavigate();

  const { setMessage } = useSnackbar();

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
        return;
      }

      setMessage(error.response.data.message as string);
    },
    mutationFn: (userData: SignupFormInput) => {
      return axios.post('/auth/register', {
        email: userData.email,
        password: userData.password,
      });
    },
  });

  const form = useForm<SignupFormInput>({
    defaultValues: {
      email: '',
      password: '',
      acceptTC: false,
    },
    mode: 'onChange',
  });

  const onClose = () => {
    form.reset();
    navigate(-1);
  };

  return { mutation, form, onClose };
};
