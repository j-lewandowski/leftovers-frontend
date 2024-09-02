import { ReactNode } from 'react';
import ForgotPasswordModal from '../modals/ForgotPasswordModal';

const ForgotPasswordHOC = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ForgotPasswordModal />
    </>
  );
};

export default ForgotPasswordHOC;
