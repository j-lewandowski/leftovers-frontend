import { Menu } from '@mui/icons-material';
import {
  AppBar,
  Drawer,
  IconButton,
  Stack,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../Logo';
import AuthenticatedUserButtons from './AuthenticatedUserButtons';
import Searchbar from './Searchbar';
import UnauthenticatedUserButtons from './UnauthenticatedUserButtons';

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Nav position="sticky">
      <ToolbarWrapper>
        <LeftWrapper>
          <Logo />
          <Searchbar />
        </LeftWrapper>
        {isMobile ? (
          <IconButton onClick={() => setIsDrawerOpen(true)}>
            <Menu />
          </IconButton>
        ) : (
          <Stack gap={2} direction="row">
            {isAuthenticated ? (
              <AuthenticatedUserButtons />
            ) : (
              <UnauthenticatedUserButtons />
            )}
          </Stack>
        )}
        <Drawer
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          anchor="right"
        >
          <Stack gap={2} direction="column" padding={'1rem'}>
            {isAuthenticated ? (
              <AuthenticatedUserButtons />
            ) : (
              <UnauthenticatedUserButtons />
            )}
          </Stack>
        </Drawer>
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

const ToolbarWrapper = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'start',
  gap: '0.5rem',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
  },
  padding: '1rem 5rem',
}));

const LeftWrapper = styled('div')({
  display: 'flex',
  flex: '1 1 0%',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '1rem',
});

export default Navbar;
