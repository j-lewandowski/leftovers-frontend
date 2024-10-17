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
import { useCategories } from '../../../hooks/useCategories';
import { usePreparationTime } from '../../../hooks/usePreparationTime';
import ImageUploadInput from '../../inputs/ImageUploadInput';

const BasicInformation = () => {
  const { categories } = useCategories();
  const { preparationTime } = usePreparationTime();
  const { control } = useFormContext();

  return (
    <Stack direction="row" gap={4}>
      <Stack gap={2}>
        <Typography>Add photo</Typography>
        <ImageUploadInput />
      </Stack>
      <Stack flex={1} gap={4}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="subtitle1">Add basic information</Typography>
          <Button variant="contained">Next</Button>
        </Stack>
        <Stack gap={3}>
          <Controller
            name="title"
            control={control}
            rules={{ maxLength: 100, required: true }}
            render={({ field }) => (
              <TextField {...field} label="Title" variant="outlined" />
            )}
          ></Controller>
          <Controller
            name="description"
            control={control}
            rules={{ maxLength: 200, required: true }}
            render={({ field }) => (
              <TextField {...field} label="Description" variant="outlined" />
            )}
          ></Controller>
        </Stack>
        <Stack direction="row" gap={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Controller
              name="category"
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
