import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SigninFormInput } from '../types';

interface ErrorResponse {
  message: string | string[];
}

export const useSignIn = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const signInMutation = useMutation({
    onSuccess: (res) => {
      if (form.getValues('rememberMe')) {
        localStorage.setItem('accessToken', res.data.accessToken);
      } else {
        sessionStorage.setItem('accessToken', res.data.accessToken);
      }

      setMessage('Successfully logged in ✅');
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
    mutationFn: (userData: SigninFormInput) => {
      return axios.post(
        '/auth/login',
        {},
        {
          auth: {
            username: userData.email,
            password: userData.password,
          },
        },
      );
    },
  });

  const form = useForm<SigninFormInput>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',
  });

  const onClose = () => {
    form.reset();
    navigate('/');
  };

  return { signInMutation, form, message, setMessage, onClose };
};
