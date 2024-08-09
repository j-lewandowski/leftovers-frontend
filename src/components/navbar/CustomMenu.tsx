import { Menu, MenuList } from '@mui/material';
import { ReactNode } from 'react';

interface CustomMenuProps {
  anchor: HTMLElement | null;
  onClose: () => void;
  children: ReactNode;
}

const CustomMenu = ({ anchor, onClose, children }: CustomMenuProps) => {
  return (
    <Menu
      open={!!anchor}
      anchorEl={anchor}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuList>{children}</MenuList>
    </Menu>
  );
};

export default CustomMenu;
