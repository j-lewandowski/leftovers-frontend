import { ThemeProvider } from '@mui/material';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HttpService } from './query-client-provider';
import Router from './router';
import { theme } from './theme';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_BASE_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HttpService>
        <Router />
      </HttpService>
    </ThemeProvider>
  </React.StrictMode>,
);
