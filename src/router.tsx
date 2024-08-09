import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

const Router = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
    },
  ]);

  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default Router;
