import { styled } from '@mui/material';
import logoImage from '../assets/logo.svg';

const Logo = () => {
  return <LogoImage src={logoImage} />;
};

const LogoImage = styled('img')({
  width: '2rem',
  height: '2rem',
});

export default Logo;
