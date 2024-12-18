import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ReactNode, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API } from '../../assets/constants/api';
import { useSnackbar } from '../../context/SnackbarContext';
import httpService from '../../services/http.service';

const AccountActivationHOC = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const { setMessage } = useSnackbar();
  const hasMutated = useRef<boolean>(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      return httpService.post(API.AUTH.CONFIRM_SIGNUP, {
        email: searchParams.get('userEmail'),
        validationToken: searchParams.get('requestId'),
      });
    },
    onSuccess: () => {
      setMessage(
        "You've successfully completed the registration process. You may now log in ✅",
      );
      navigate('/?signin=true');
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
