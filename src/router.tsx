import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from './layout';
import Homepage from './pages/Homepage';
import RecipeDetails from './pages/RecipeDetails';
import RecipeList from './pages/RecipeList';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipes" element={<RecipeList />}>
          <Route path=":recipeId" element={<RecipeDetails />} />
        </Route>
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
