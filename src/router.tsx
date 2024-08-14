import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import App from './App';

import { Layout } from './layout';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<App />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
