import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ReactNode, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { API } from '../../assets/constants/api';
import { useSnackbar } from '../../context/SnackbarContext';

const AccountActivationHOC = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const { setMessage } = useSnackbar();
  const hasMutated = useRef<boolean>(false);

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post(API.AUTH.CONFIRM_SIGNUP, {
        email: searchParams.get('userEmail'),
        validationToken: searchParams.get('requestId'),
      });
    },
    onSuccess: (res) => {
      setMessage(res.data.message);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (!error.response) {
        setMessage('Unknown error');
        return;
      }
      setMessage(error.response.data.message);
    },
  });

  useEffect(() => {
    if (
      !hasMutated.current &&
      searchParams.get('requestId') &&
      searchParams.get('userEmail')
    ) {
      mutation.mutate();
      hasMutated.current = true;
    }
  }, [searchParams]);

  return <>{children}</>;
};

export default AccountActivationHOC;
