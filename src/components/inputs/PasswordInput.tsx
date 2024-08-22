import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { useState } from 'react';

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      placeholder="Create a password"
      label="Password*"
      size="small"
      fullWidth
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
