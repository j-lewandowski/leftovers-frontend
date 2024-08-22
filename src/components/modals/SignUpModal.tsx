import { Close } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  styled,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import { Link } from 'react-router-dom';

const SignUpModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <DialogContainer open={isOpen} onClose={onClose} fullWidth>
      <CloseDialogContainer>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </CloseDialogContainer>
      <Title>
        <Typography variant="h4">Sign up</Typography>
      </Title>
      <Content>
        <Typography variant="body2">Create an account for free</Typography>
      </Content>
      <Content>
        <EmailInput />
      </Content>
      <Content>
        <PasswordInput />
      </Content>
      <Content>
        <FormControlLabel
          control={<Checkbox />}
          labelPlacement="end"
          label={
            <Typography>
              Acceptance of{' '}
              <TermsAndConditionsLink target="_blank">
                Terms & Conditions and Privacy Policy*
              </TermsAndConditionsLink>
            </Typography>
          }
        />
      </Content>
      <SubmitContainer>
        <Button variant="contained" size="medium">
          Create an account
        </Button>
      </SubmitContainer>
      <Content>
        <Typography variant="body2">
          Already have an account? <LoginLink to="/sign-in">Login</LoginLink>
        </Typography>
      </Content>
    </DialogContainer>
  );
};

const DialogContainer = styled(Dialog)(() => ({
  minWidth: '500px',
}));

const CloseDialogContainer = styled(DialogContent)(() => ({
  justifyContent: 'end',
  display: 'flex',
  padding: '1rem 1.5rem 0 1.5rem',
}));

const Title = styled(DialogTitle)(() => ({
  padding: '0 1.5rem 1rem 1.5rem',
}));

const Content = styled(DialogContent)(() => ({
  padding: '0 1.5rem 2rem 1.5rem',
  overflow: 'visible',
}));

const TermsAndConditionsLink = styled('a')(() => ({
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 500,
}));

const SubmitContainer = styled(DialogActions)(() => ({
  justifyContent: 'start',
  padding: '0.5rem 1.5rem 1.5rem 1.5rem',
}));

const LoginLink = styled(Link)(() => ({
  textDecoration: 'underline',
  color: 'inherit',
}));

export default SignUpModal;
