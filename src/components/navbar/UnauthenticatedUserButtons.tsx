import CategoriesButton from '../buttons/CategoriesButton';
import SigninButton from '../buttons/SigninButton';
import SignupButton from '../buttons/SignupButton';

const UnauthenticatedUserButtons = () => {
  return (
    <>
      <CategoriesButton />
      <SigninButton />
      <SignupButton />
    </>
  );
};

export default UnauthenticatedUserButtons;
