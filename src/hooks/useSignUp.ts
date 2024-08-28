import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface ErrorReponse {
  message: string | string[];
}

interface FormInputValues {
  email: string;
  password: string;
  acceptTC: boolean;
}

export const useSignUp = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState('');

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
    mutationFn: (userData: FormInputValues) => {
      return axios.post('/auth/register', {
        email: userData.email,
        password: userData.password,
      });
    },
  });

  const form = useForm<FormInputValues>({
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

  return { mutation, form, message, setMessage, onClose };
};
