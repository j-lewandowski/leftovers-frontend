import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RESET_PASSWORD_ENDPOINT } from '../assets/constants/api';
import { useSnackbar } from '../context/SnackbarContext';
import { ResetPasswordFormInput } from '../models/user.model';
import { ErrorResponse } from '../types';

export const useResetPassword = () => {
  const [searchParams] = useSearchParams();
  const { setMessage } = useSnackbar();
  const navigate = useNavigate();

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordFormInput) => {
      return axios.post(RESET_PASSWORD_ENDPOINT, {
        validationToken: searchParams.get('requestId'),
        newPassword: data.newPassword,
      });
    },
    onSuccess: () => {
      setMessage(
        '✅ Password changed successfully! You can now log in using your updated credentials.',
      );
      onClose();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      setMessage(error.response?.data.message as string);
    },
  });

  const form = useForm<ResetPasswordFormInput>({
    defaultValues: {
      newPassword: '',
      repeatNewPassword: '',
    },
  });

  const onClose = () => {
    form.reset();
    navigate('?signin=true');
  };

  return { form, resetPasswordMutation, onClose };
};
