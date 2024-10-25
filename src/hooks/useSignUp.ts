import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API } from '../assets/constants/api';
import { useSnackbar } from '../context/SnackbarContext';
import { SignupFormInput } from '../models/user.model';
import httpService from '../services/http.service';
import { ErrorResponse } from '../types';

export const useSignUp = () => {
  const navigate = useNavigate();

  const { setMessage } = useSnackbar();

  const mutation = useMutation({
    onSuccess: () => {
      setMessage(
        "You've successfully registered on our website. To complete the registration process, please check your email 📬",
      );
      onClose();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
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
      return httpService.post(API.AUTH.REGISTER, {
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
