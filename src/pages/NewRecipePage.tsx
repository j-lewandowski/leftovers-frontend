import {
  InfoOutlined,
  LibraryBooksOutlined,
  LunchDiningOutlined,
  RestaurantMenuOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import { usePreparationTime } from '../hooks/usePreparationTime';

const NewRecipePage = () => {
  const [page, setPage] = useState<number>(0);
  const { categories } = useCategories();
  const { preparationTime } = usePreparationTime();

  const onChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage(newValue);
  };

  return (
    <NewRecipePageWrapper>
      <Typography variant="h5">Add Recipe</Typography>
      <Stack>
        <Tabs value={page} onChange={onChange}>
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
                <Typography>Ingredients</Typography>
              </Stack>
            }
          ></Tab>
          <Tab
            label={
              <Stack direction="row" gap={1}>
                <LibraryBooksOutlined />
                <Typography>Ingredients</Typography>
              </Stack>
            }
          ></Tab>
        </Tabs>
        <Divider />
      </Stack>

      <PageContentWrapper padding={4}>
        <Stack direction="row">
          <Stack width="100%">
            <Typography>Add photo</Typography>
          </Stack>
          <Stack width="100%" gap={4}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">Add basic information</Typography>
              <Button variant="contained">Next</Button>
            </Stack>
            <Stack gap={3}>
              <TextField label="Title" variant="outlined" />
              <TextField label="Description" variant="outlined" />
            </Stack>
            <Stack direction="row" gap={4}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category.filter} value={category.filter}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Preparation time</InputLabel>
                <Select label="Preparation time">
                  {preparationTime.map((time) => (
                    <MenuItem key={time.value} value={time.value}>
                      {time.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
        </Stack>
      </PageContentWrapper>
    </NewRecipePageWrapper>
  );
};
const NewRecipePageWrapper = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'calc(100dvh - 8.5rem)',
  position: 'relative',
  padding: '2.5rem 3rem',
  gap: '1rem',
  backgroundColor: theme.palette.background.default,
}));

const PageContentWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '1rem',
  width: '100%',
  height: 'fit-content',
}));

export default NewRecipePage;
