import { styled } from '@mui/material';
import { Link } from 'react-router-dom';
import logoImage from '../assets/logo.svg';

const Logo = () => {
  return (
    <Wrapper to="/">
      <LogoImage alt="logo" src={logoImage} />
    </Wrapper>
  );
};

const LogoImage = styled('img')({
  width: '2rem',
  height: '2rem',
});

const Wrapper = styled(Link)({
  width: 'fit-content',
  height: 'fit-content',
});

export default Logo;
