import { ThemeProvider } from '@mui/material';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { SnackbarContextProvider } from './context/SnackbarContext';
import { HttpService } from './query-client-provider';
import { theme } from './theme';

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <HttpService>
        <SnackbarContextProvider>{children}</SnackbarContextProvider>
      </HttpService>
    </ThemeProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => ({
  ...render(ui, { wrapper: AllTheProviders, ...options }),
  user: userEvent.setup(),
});

export * from '@testing-library/react';
export { customRender as render };
