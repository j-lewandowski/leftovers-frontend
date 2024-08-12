import { Button, MenuItem, styled, Typography } from '@mui/material';
import { useCategories } from '../../hooks/useCategories';
import { ExpandMore } from '@mui/icons-material';
import Dropdown from '../navbar/Dropdown';
import { useState } from 'react';

const CategoriesButton = () => {
  const { categories } = useCategories();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const onOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  return (
    <>
      <Button
        variant="text"
        color="secondary"
        endIcon={<Icon isOpen={!!anchor} />}
        onClick={onOpen}
      >
        <Typography>Recipes</Typography>
      </Button>

      <Dropdown anchor={anchor} onClose={() => setAnchor(null)}>
        {categories.map((category, i) => (
          <MenuItem
            sx={{ width: '220px' }}
            key={category.name}
            divider={i !== categories.length - 1}
          >
            {category.name}
          </MenuItem>
        ))}
      </Dropdown>
    </>
  );
};

const Icon = styled(ExpandMore)(({ isOpen }: { isOpen: boolean }) => ({
  rotate: isOpen ? '180deg' : '0deg',
}));

export default CategoriesButton;
