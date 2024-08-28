import { Outlet } from 'react-router-dom';
import AccountActivationHOC from './components/AccountActivationHOC';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';

export const Layout = () => {
  return (
    <div>
      <AccountActivationHOC>
        <Navbar />
        <Outlet />
        <Footer />
      </AccountActivationHOC>
    </div>
  );
};
