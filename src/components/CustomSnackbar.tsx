import { Close } from '@mui/icons-material';
import {
  IconButton,
  Portal,
  Snackbar,
  SnackbarContent,
  styled,
} from '@mui/material';

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

  if (!message) {
    return null;
  }

  return (
    <Portal>
      <Snackbar
        open
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
      >
        <Content message={message} action={action} />
      </Snackbar>
    </Portal>
  );
};

const Content = styled(SnackbarContent)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  color: theme.palette.text.primary,
}));

export default CustomSnackbar;
