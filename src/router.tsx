import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from './layout';
import Homepage from './pages/Homepage';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
