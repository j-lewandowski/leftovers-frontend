import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomSnackbar from './CustomSnackbar';

const AccountActivationHOC = ({ children }: { children: ReactNode }) => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');
  const hasMutated = useRef<boolean>(false);

  const mutation = useMutation({
    mutationFn: () => {
      return axios.post('/auth/confirm', {
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

  return (
    <>
      {children}
      <CustomSnackbar message={message} handleClose={() => setMessage('')} />
    </>
  );
};

export default AccountActivationHOC;
