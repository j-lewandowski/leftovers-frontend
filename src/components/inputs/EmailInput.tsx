import { TextField } from '@mui/material';
import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

interface EmailInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

const EmailInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: EmailInputProps<TFieldValues, TName>,
) => {
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
