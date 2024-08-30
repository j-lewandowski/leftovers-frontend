import { AppBar, Stack, styled, Toolbar } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../Logo';
import AuthenticatedUserButtons from './AuthenticatedUserButtons';
import Searchbar from './Searchbar';
import UnauthenticatedUserButtons from './UnauthenticatedUserButtons';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Nav position="sticky">
      <ToolbarWrapper>
        <LeftWrapper>
          <Logo />
          <Searchbar />
        </LeftWrapper>
        <Stack gap={2} direction="row">
          {isAuthenticated ? (
            <AuthenticatedUserButtons />
          ) : (
            <UnauthenticatedUserButtons />
          )}
        </Stack>
      </ToolbarWrapper>
    </Nav>
  );
};

const Nav = styled(AppBar)({
  width: '100%',
  minHeight: '64px',
  backgroundColor: '#ffffff',
  boxShadow: 'none',
  justifyContent: 'center',
});

const ToolbarWrapper = styled(Toolbar)({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'start',
  gap: '0.5rem',
  padding: '1rem 5rem',
});

const LeftWrapper = styled('div')({
  display: 'flex',
  flex: '1 1 0%',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '1rem',
});

export default Navbar;
