import {
  InfoOutlined,
  LibraryBooksOutlined,
  LunchDiningOutlined,
  RestaurantMenuOutlined,
} from '@mui/icons-material';
import { Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useMultistepForm } from '../../../context/MultistepFormContext';

const AddRecipeFormHeader = () => {
  const { stepNumber, onTabClick } = useMultistepForm();

  return (
    <>
      <Typography variant="h5">Add Recipe</Typography>
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
