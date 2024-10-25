import { createTheme } from '@mui/material/styles';

const colorsTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
  },
  palette: {
    primary: {
      main: '#43A047',
      dark: '#2E7D32',
      light: '#66BB6A',
    },
    secondary: {
      main: 'rgba(66, 66, 66, 1)',
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
      disabled: 'rgba(0, 0, 0, 0.38)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
    },
  },
});

export const theme = createTheme(colorsTheme, {
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
