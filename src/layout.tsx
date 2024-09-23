import { Outlet } from 'react-router-dom';
import CustomSnackbar from './components/CustomSnackbar';
import Footer from './components/footer/Footer';
import AccountActivationHOC from './components/HOCs/AccountActivationHOC';
import ForgotPasswordHOC from './components/HOCs/ForgotPasswordHOC';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './context/AuthContext';

export const Layout = () => {
  return (
    <>
      <AuthProvider>
        <ForgotPasswordHOC>
          <AccountActivationHOC>
            <Navbar />
            <CustomSnackbar />
            <Outlet />
            <Footer />
          </AccountActivationHOC>
        </ForgotPasswordHOC>
      </AuthProvider>
    </>
  );
};
