import { FilterList } from '@mui/icons-material';
import {
  Button,
  Checkbox,
  Divider,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import Dropdown from '../navbar/Dropdown';

interface FilterButtonProps {
  name: string;
}

const FilterButton = ({ name }: FilterButtonProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const { categories } = useCategories();
  const [newSearchParams, setNewSearchParams] = useState<URLSearchParams>(
    new URLSearchParams(),
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchor(e.currentTarget);
  };

  const onCategoryClick = (category: string) => {
    setNewSearchParams((prev) => {
      if (prev.has('category', category)) {
        prev.delete('category', category);
      } else {
        prev.append('category', category);
      }
      return prev;
    });
  };

  const onSavedClick = (value: boolean) => {
    setNewSearchParams((prev) => {
      if (prev.get('saved') === value.toString()) {
        prev.delete('saved');
      } else {
        prev.set('saved', value.toString());
      }

      return new URLSearchParams(prev);
    });
  };

  const onClose = () => {
    setAnchor(null);

    // if (savedRecipes !== null) {
    //   newSearchParams.set('saved', savedRecipes.toString());
    // }
    setSearchParams(newSearchParams);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<FilterList />}
        onClick={onClick}
      >
        {name}
      </Button>
      <Dropdown anchor={anchor} onClose={onClose}>
        <MenuList>
          <MenuItem>
            <Typography>Categories</Typography>
          </MenuItem>
          {categories.map((category, i) => (
            <>
              {i !== 0 && <Divider />}
              <MenuItem key={category.name}>
                <Checkbox
                  defaultChecked={searchParams.has('category', category.filter)}
                  onClick={() => onCategoryClick(category.filter)}
                />
                <Typography>{category.name}</Typography>
              </MenuItem>
            </>
          ))}
          <MenuItem>Saved</MenuItem>
          <MenuItem>
            <Checkbox
              defaultChecked={searchParams.has('saved', 'true')}
              onClick={() => onSavedClick(true)}
            />
            <Typography>Saved Recipes</Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <Checkbox
              defaultChecked={searchParams.has('saved', 'false')}
              onClick={() => onSavedClick(false)}
            />
            <Typography>Unsaved Recipes</Typography>
          </MenuItem>
        </MenuList>
      </Dropdown>
    </>
  );
};

export default FilterButton;
