import Navbar from './components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/Footer';

export const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
