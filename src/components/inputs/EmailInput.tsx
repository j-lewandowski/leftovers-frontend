import { TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormInputValues } from '../modals/SignUpModal';

const EmailInput = (props: UseControllerProps<FormInputValues>) => {
  const {
    field: { onChange, value },
  } = useController({ ...props, rules: { required: true, minLength: 1 } });

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
