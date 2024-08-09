import { styled } from '@mui/material';
import logoImage from '../assets/logo.svg';

const Logo = () => {
  const Logo = styled('img')({
    width: '2rem',
    height: '2rem',
  });

  return <Logo src={logoImage} />;
};

export default Logo;
