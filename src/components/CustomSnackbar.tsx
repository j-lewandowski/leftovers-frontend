import { Close } from '@mui/icons-material';
import { IconButton, Snackbar, SnackbarContent, styled } from '@mui/material';

interface SnackbarProps {
  message: string;
  handleClose: () => void;
}

const CustomSnackbar = ({ message, handleClose }: SnackbarProps) => {
  const action = (
    <>
      <IconButton size="small" onClick={handleClose}>
        <Close />
      </IconButton>
    </>
  );
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Content message={message} action={action} />
    </Snackbar>
  );
};

const Content = styled(SnackbarContent)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.primary,
}));

export default CustomSnackbar;
