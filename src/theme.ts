import { createTheme } from '@mui/material';

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
  palette: {
    primary: {
      main: '#43A047',
      dark: '#2E7D32',
      light: '#66BB6A',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      default: '#F3F6F9',
    },
    action: {
      active: 'rgba(0, 0, 0, 0.56)',
    },
  },
});
