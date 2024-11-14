import axios from 'axios';

const httpService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpService.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('accessToken');
      window.dispatchEvent(new Event('tokenRemoved'));
    }
    return Promise.reject(error);
  },
);
export default httpService;
