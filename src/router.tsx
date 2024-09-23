import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from './layout';
import Homepage from './pages/Homepage';
import RecipeDetails from './pages/RecipeDetails';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipes">
          <Route path=":recipeId" element={<RecipeDetails />} />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
