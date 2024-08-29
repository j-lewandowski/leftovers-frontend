import { TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormInputValues } from '../modals/SignupModal';

const EmailInput = (props: UseControllerProps<FormInputValues>) => {
  const {
    field: { onChange, value },
  } = useController({
    ...props,
    rules: {
      required: true,
      minLength: 1,
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Invalid email address',
      },
    },
  });

  return (
    <TextField
      label="E-mail address*"
      placeholder="Enter your e-mail"
      size="small"
      onChange={onChange}
      value={value}
      fullWidth
    />
  );
};

export default EmailInput;
