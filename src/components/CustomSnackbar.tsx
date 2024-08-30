import { Close } from '@mui/icons-material';
import {
  IconButton,
  Portal,
  Snackbar,
  SnackbarContent,
  styled,
} from '@mui/material';
import { useSnackbar } from '../context/SnackbarContext';

const CustomSnackbar = () => {
  const { message, setMessage } = useSnackbar();

  const onClose = () => {
    setMessage('');
  };

  const action = (
    <>
      <IconButton size="small" onClick={onClose}>
        <Close />
      </IconButton>
    </>
  );
  return (
    <Portal>
      <Snackbar
        open={!!message}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={onClose}
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
