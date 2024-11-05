import {
  InfoOutlined,
  LibraryBooksOutlined,
  LunchDiningOutlined,
  RestaurantMenuOutlined,
} from '@mui/icons-material';
import {
  Breadcrumbs,
  Divider,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useMultistepForm } from '../../../context/MultistepFormContext';

const AddRecipeFormHeader = () => {
  const { stepNumber, onTabClick } = useMultistepForm();
  const location = useLocation();
  const { getValues } = useFormContext();

  const isEditPage = location.pathname.includes('edit-recipe');

  return (
    <>
      {isEditPage && (
        <Breadcrumbs>
          <Typography variant="body1">
            <Link
              href="/recipes?myRecipes=true"
              color="inherit"
              underline="none"
            >
              My recipes
            </Link>
          </Typography>
          <Typography>Edit</Typography>
        </Breadcrumbs>
      )}
      <Typography variant="h5">
        {isEditPage ? getValues('title') : 'Add Recipe'}
      </Typography>
      <Stack>
        <Tabs value={stepNumber} onChange={onTabClick}>
          <Tab
            label={
              <Stack direction="row" gap={1}>
                <InfoOutlined />
                <Typography>Basic information</Typography>
              </Stack>
            }
          ></Tab>
          <Tab
            label={
              <Stack direction="row" gap={1}>
                <LunchDiningOutlined />
                <Typography>Ingredients</Typography>
              </Stack>
            }
          ></Tab>
          <Tab
            label={
              <Stack direction="row" gap={1}>
                <RestaurantMenuOutlined />
                <Typography>Preparation Method</Typography>
              </Stack>
            }
          ></Tab>
          <Tab
            label={
              <Stack direction="row" gap={1}>
                <LibraryBooksOutlined />
                <Typography>Publication</Typography>
              </Stack>
            }
          ></Tab>
        </Tabs>
        <Divider />
      </Stack>
    </>
  );
};

export default AddRecipeFormHeader;
