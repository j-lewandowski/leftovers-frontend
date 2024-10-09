import { ExpandMore } from '@mui/icons-material';
import { Button, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCategories } from '../../hooks/useCategories';
import Dropdown from '../navbar/Dropdown';

const CategoriesButton = () => {
  const { categories } = useCategories();
  const navigate = useNavigate();
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
            onClick={() =>
              navigate(
                'recipes' +
                  (category.filter ? `?category=${category.filter}` : ''),
              )
            }
          >
            {category.name}
          </MenuItem>
        ))}
      </Dropdown>
    </>
  );
};

const Icon = styled(ExpandMore)<{ $isOpen: boolean }>`
  transition: transform 0.15s ease-in !important;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'} !important;
`;

export default CategoriesButton;
