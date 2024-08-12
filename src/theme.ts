import { createTheme } from '@mui/material';

const colorsTheme = createTheme({
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

export const theme = createTheme(colorsTheme, {
  typography: {
    fontFamily: 'Poppins',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'text', color: 'secondary' },
          style: {
            color: colorsTheme.palette.text.secondary,
          },
        },
      ],
      styleOverrides: {
        root: {
          fontWeight: '500',
          fontSize: '14px',
          textTransform: 'none',
        },
      },
    },
  },
});
