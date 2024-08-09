import { Button, MenuItem, styled, Typography } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CustomMenu from './CustomMenu';
import { useCategories } from '../../hooks/useCategories';

const CategoriesButton = styled(Button)({});

const Categories = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const { categories } = useCategories();

  const Icon = styled(KeyboardArrowDownIcon)(({ theme }) => ({
    rotate: anchor ? '180deg' : '0deg',
    color: theme.palette.text.secondary,
  }));

  const ButtonText = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontWeight: '500',
  }));

  const Item = styled(MenuItem)(({ theme }) => ({
    width: '220px',
    color: theme.palette.text.primary,
  }));

  const onOpen = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget);
    setAnchor(e.currentTarget);
  };

  return (
    <div>
      <CategoriesButton
        variant="text"
        endIcon={<Icon />}
        onClick={onOpen}
        color="inherit"
        size="medium"
      >
        <ButtonText variant="body2">Recipes</ButtonText>
      </CategoriesButton>
      <CustomMenu anchor={anchor} onClose={() => setAnchor(null)}>
        {categories.map((category, i) => (
          <Item key={category.name} divider={i !== categories.length - 1}>
            {category.name}
          </Item>
        ))}
      </CustomMenu>
    </div>
  );
};

export default Categories;
