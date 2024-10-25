import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API } from '../assets/constants/api';
import { useSnackbar } from '../context/SnackbarContext';
import { ForgotPasswordFormInput } from '../models/user.model';
import httpService from '../services/http.service';

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const { setMessage } = useSnackbar();

  const forgotPasswordMutation = useMutation({
    mutationFn: (userData: ForgotPasswordFormInput) => {
      return httpService.post(API.AUTH.FORGOT_PASSWORD, {
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
