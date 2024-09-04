import { Outlet } from 'react-router-dom';
import CustomSnackbar from './components/CustomSnackbar';
import Footer from './components/footer/Footer';
import AccountActivationHOC from './components/HOCs/AccountActivationHOC';
import ForgotPasswordHOC from './components/HOCs/ForgotPasswordHOC';
import Navbar from './components/navbar/Navbar';

export const Layout = () => {
  return (
    <>
      <ForgotPasswordHOC>
        <AccountActivationHOC>
          <Navbar />
          <CustomSnackbar />
          <Outlet />
          <Footer />
        </AccountActivationHOC>
      </ForgotPasswordHOC>
    </>
  );
};
