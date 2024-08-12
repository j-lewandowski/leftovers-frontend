import { Button, MenuItem, styled, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import Dropdown from '../navbar/Dropdown';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const MyAccountButton = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const { signOut } = useAuth();

  const onOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon isOpen={!!anchor} />}
        onClick={onOpen}
      >
        <Typography>My account</Typography>
      </Button>

      <Dropdown anchor={anchor} onClose={() => setAnchor(null)}>
        <MenuItem
          sx={{ width: '220px' }}
          component="a"
          href="/saved-recipes"
          divider
        >
          Saved recipes
        </MenuItem>
        <MenuItem
          sx={{ width: '220px' }}
          component="a"
          href="/my-recipes"
          divider
        >
          My recipes
        </MenuItem>
        <MenuItem sx={{ width: '220px' }} onClick={signOut}>
          Log out
        </MenuItem>
      </Dropdown>
    </>
  );
};

const Icon = styled(ExpandMore)(({ isOpen }: { isOpen: boolean }) => ({
  rotate: isOpen ? '180deg' : '0deg',
}));

export default MyAccountButton;
