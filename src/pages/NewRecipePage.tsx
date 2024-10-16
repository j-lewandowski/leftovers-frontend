import {
  InfoOutlined,
  LibraryBooksOutlined,
  LunchDiningOutlined,
  RestaurantMenuOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const NewRecipePage = () => {
  const [page, setPage] = useState<number>(0);

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
        <Typography>Page content</Typography>
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
