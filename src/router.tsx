import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
