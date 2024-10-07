import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FORGOT_PASSWORD_ENDPOINT } from '../assets/constants/api';
import { useSnackbar } from '../context/SnackbarContext';
import { ForgotPasswordFormInput } from '../models/user.model';

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { setMessage } = useSnackbar();

  const forgotPasswordMutation = useMutation({
    mutationFn: (userData: ForgotPasswordFormInput) => {
      return axios.post(FORGOT_PASSWORD_ENDPOINT, {
        email: userData.email,
      });
    },
    onSuccess: () => {
      setMessage(
        'Thanks! An e-mail was sent that will ask you to click on a link to verify that you own this account 📬',
      );
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
