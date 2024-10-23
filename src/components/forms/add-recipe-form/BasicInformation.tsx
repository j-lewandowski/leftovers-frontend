import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useMultistepForm } from '../../../context/MultistepFormContext';
import { useCategories } from '../../../hooks/useCategories';
import { usePreparationTime } from '../../../hooks/usePreparationTime';
import ImageUploadInput from '../../inputs/ImageUploadInput';

const BasicInformation = ({ isVisible }: { isVisible: boolean }) => {
  const { categories } = useCategories();
  const { preparationTime } = usePreparationTime();
  const { watch } = useFormContext();
  const { next } = useMultistepForm();

  const isNextDisabled = () => {
    const formData = watch([
      'title',
      'description',
      'categoryName',
      'preparationTime',
      'image',
    ]);

    return formData.some((field) => !field);
  };

  return (
    <Stack
      direction="row"
      gap={4}
      sx={{ display: isVisible ? 'flex' : 'none' }}
    >
      <Stack gap={2}>
        <Typography>Add photo</Typography>
        <Controller name="image" render={() => <ImageUploadInput />} />
      </Stack>
      <Stack flex={1} gap={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1">Add basic information</Typography>
          <Button
            variant="contained"
            disabled={isNextDisabled()}
            onClick={next}
          >
            Next
          </Button>
        </Stack>
        <Stack gap={3}>
          <Controller
            name="title"
            rules={{ minLength: 1, maxLength: 100, required: true }}
            render={({ field }) => (
              <TextField {...field} label="Title" variant="outlined" />
            )}
          ></Controller>
          <Controller
            name="description"
            rules={{ minLength: 1, maxLength: 200, required: true }}
            render={({ field }) => (
              <TextField {...field} label="Description" variant="outlined" />
            )}
          ></Controller>
        </Stack>
        <Stack direction="row" gap={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Controller
              name="categoryName"
              rules={{ required: true }}
              render={({ field }) => (
                <Select label="Category" {...field} defaultValue={''}>
                  {categories.map((category) => (
                    <MenuItem key={category.filter} value={category.filter}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Preparation time</InputLabel>
            <Controller
              name="preparationTime"
              rules={{ required: true }}
              render={({ field }) => (
                <Select label="Preparation time" {...field} defaultValue={''}>
                  {preparationTime.map((time) => (
                    <MenuItem key={time.value} value={time.value}>
                      {time.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BasicInformation;
