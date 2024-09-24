import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD_ENDPOINT } from '../assets/constants/api';
import { useSnackbar } from '../context/SnackbarContext';
import { ForgotPasswordFormInput } from '../types';

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { setMessage } = useSnackbar();

  const forgotPasswordMutation = useMutation({
    mutationFn: (userData: ForgotPasswordFormInput) => {
      return axios.post(FORGOT_PASSWORD_ENDPOINT, {
        email: userData.email,
      });
    },
    onSuccess: (res) => {
      setMessage(res.data.message);
      onClose();
    },
  });

  const form = useForm<ForgotPasswordFormInput>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const onClose = () => {
    form.reset();
    navigate('/');
  };

  return { form, onClose, forgotPasswordMutation };
};
