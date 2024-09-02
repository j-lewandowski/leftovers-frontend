import { ReactNode } from 'react';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';
import ResetPasswordModal from '../modals/ResetPasswordModal';

const ForgotPasswordHOC = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ForgotPasswordModal />
      <ResetPasswordModal />
    </>
  );
};

export default ForgotPasswordHOC;
