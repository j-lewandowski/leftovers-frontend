import { ExpandMore } from '@mui/icons-material';
import { Button, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/AuthContext';
import Dropdown from '../navbar/Dropdown';

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
        endIcon={<Icon $isOpen={!!anchor} />}
        onClick={onOpen}
      >
        <Typography>My account</Typography>
      </Button>

      <Dropdown anchor={anchor} onClose={() => setAnchor(null)}>
        <MenuItem
          sx={{ width: '220px' }}
          component="a"
          href="/recipes?saved=true"
          divider
        >
          Saved recipes
        </MenuItem>
        <MenuItem
          sx={{ width: '220px' }}
          component="a"
          href="/recipes?myRecipes=true"
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

const Icon = styled(ExpandMore)<{ $isOpen: boolean }>`
  transition: transform 0.15s ease-in !important;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'} !important;
`;

export default MyAccountButton;
