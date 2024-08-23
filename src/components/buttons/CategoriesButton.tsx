import { ExpandMore } from '@mui/icons-material';
import { Button, MenuItem, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import Dropdown from '../navbar/Dropdown';

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
        endIcon={<Icon $isOpen={!!anchor} />}
        onClick={onOpen}
      >
        <Typography>Recipes</Typography>
      </Button>

      <Dropdown anchor={anchor} onClose={() => setAnchor(null)}>
        {categories.map((category, i) => (
          <MenuItem
            key={`${category.name}-${i}`}
            divider={i !== categories.length - 1}
          >
            {category.name}
          </MenuItem>
        ))}
      </Dropdown>
    </>
  );
};

const Icon = styled(ExpandMore)(({ $isOpen }: { $isOpen: boolean }) => ({
  transform: $isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: 'transform 0.3s ease',
}));

export default CategoriesButton;
