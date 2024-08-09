import {
  AppBar,
  Button,
  Stack,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import Searchbar from './Searchbar';
import Logo from '../Logo';
import Categories from './CategoriesButton';

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

const BaseButton = styled(Button)({
  fontWeight: '500',
});

const Navbar = () => {
  return (
    <Nav position="fixed">
      <ToolbarWrapper>
        <LeftWrapper>
          <Logo />
          <Searchbar />
        </LeftWrapper>
        <Stack gap={2} direction="row">
          <Categories />
          <BaseButton size="medium">
            <Typography>Log in</Typography>
          </BaseButton>
          <BaseButton variant="contained" size="medium">
            <Typography>Sign up</Typography>
          </BaseButton>
        </Stack>
      </ToolbarWrapper>
    </Nav>
  );
};

export default Navbar;
