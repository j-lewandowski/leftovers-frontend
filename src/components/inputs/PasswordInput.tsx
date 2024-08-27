import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { FormInputValues } from '../modals/SignupModal';

const PasswordInput = (props: UseControllerProps<FormInputValues>) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    field: { onChange, value },
  } = useController({ ...props, rules: { required: true, minLength: 5 } });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      placeholder="Create a password"
      label="Password*"
      size="small"
      fullWidth
      onChange={onChange}
      value={value}
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword}>
              {showPassword ? (
                <VisibilityOffOutlined />
              ) : (
                <VisibilityOutlined />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
