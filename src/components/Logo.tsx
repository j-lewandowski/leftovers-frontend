import { styled } from '@mui/material';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.svg';

const Logo = () => {
  return (
    <StyledLink to="/">
      <LogoImage alt="logo" src={logoImage} />
    </StyledLink>
  );
};

const LogoImage = styled('img')({
  width: '2rem',
  height: '2rem',
});

const StyledLink = styled(Link)({
  width: 'fit-content',
  height: 'fit-content',
});

export default Logo;
