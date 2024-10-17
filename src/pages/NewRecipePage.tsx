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
import { FormProvider, useForm } from 'react-hook-form';
import { PreparationTime } from '../assets/constants/enums';
import BasicInformation from '../components/forms/add-recipe-form/BasicInformation';
import Ingredients from '../components/forms/add-recipe-form/Ingredients';

interface NewRecipeFormInput {
  title: string;
  description: string;
  category: string;
  preparationTime: PreparationTime;
  image: string;
}

const NewRecipePage = () => {
  const [page, setPage] = useState<number>(0);
  const pages = [BasicInformation, Ingredients];
  const methods = useForm<NewRecipeFormInput>({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      preparationTime: '',
      image: '',
    },
  });

  const onChange = (event: React.SyntheticEvent, newValue: number) => {
    setPage(newValue);
  };

  console.log(methods.watch());

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
                <Typography>Preparation Method</Typography>
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
        <FormProvider {...methods}>
          {/* <Ingredients /> */}
          {<BasicInformation />}
        </FormProvider>
      </PageContentWrapper>
    </NewRecipePageWrapper>
  );
};
const NewRecipePageWrapper = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: 'calc(100dvh - 8.5rem)',
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
