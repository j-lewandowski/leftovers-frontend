import { Menu } from '@mui/material';
import { ReactNode } from 'react';

interface DropdownProps {
  children: ReactNode;
  anchor: null | HTMLElement;
  onClose: () => void;
}

const Dropdown = ({ children, anchor, onClose }: DropdownProps) => {
  return (
    <Menu
      anchorEl={anchor}
      open={!!anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      sx={{ top: '0.5rem' }}
    >
      {children}
    </Menu>
  );
};

export default Dropdown;
