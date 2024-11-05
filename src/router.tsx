import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Layout } from './layout';
import Homepage from './pages/Homepage';
import NewRecipePage from './pages/NewRecipePage';
import RecipeDetails from './pages/RecipeDetails';
import RecipesList from './pages/RecipesList';

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/recipes" element={<RecipesList />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
        <Route path="/new-recipe" element={<NewRecipePage />} />
        <Route path="/edit-recipe/:recipeId" element={<NewRecipePage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default Router;
