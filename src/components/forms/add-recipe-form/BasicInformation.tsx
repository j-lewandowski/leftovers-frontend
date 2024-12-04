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
import SaveEditedFormButton from '../../buttons/SaveEditedFormButton';
import ImageUploadInput from '../../inputs/ImageUploadInput';

interface BasicInformationProps {
  isVisible: boolean;
}

const BasicInformation: React.FC<BasicInformationProps> = ({ isVisible }) => {
  const { categories } = useCategories();
  const { preparationTime } = usePreparationTime();
  const { watch } = useFormContext();
  const { goToNextStep, isEditMode } = useMultistepForm();

  const formData = watch([
    'title',
    'description',
    'categoryName',
    'preparationTime',
    'imageFile',
  ]);

  const isNextDisabled = (): boolean => {
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
          {isEditMode ? (
            <SaveEditedFormButton />
          ) : (
            <Button
              variant="contained"
              disabled={isNextDisabled()}
              onClick={goToNextStep}
              data-cy="next-button-1"
            >
              Next
            </Button>
          )}
        </Stack>
        <Stack gap={3}>
          <Controller
            name="title"
            rules={{ minLength: 1, maxLength: 100, required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                variant="outlined"
                FormHelperTextProps={{
                  sx: { textAlign: 'right' },
                }}
                helperText={`${field.value.length}/100`}
                data-cy="recipe-title"
              />
            )}
          ></Controller>
          <Controller
            name="description"
            rules={{ minLength: 1, maxLength: 200, required: true }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                FormHelperTextProps={{
                  sx: { textAlign: 'right' },
                }}
                helperText={`${field.value.length}/200`}
                data-cy="recipe-description"
              />
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
                <Select
                  label="Category"
                  {...field}
                  defaultValue={''}
                  data-cy="recipe-category"
                >
                  {categories.map((category, i) => (
                    <MenuItem
                      key={category.filter}
                      value={category.filter}
                      data-cy={`category-item-${i}`}
                    >
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
                <Select
                  label="Preparation time"
                  {...field}
                  defaultValue={undefined}
                  data-cy="recipe-preparation-time"
                >
                  {preparationTime.map((time, i) => (
                    <MenuItem
                      key={time.value}
                      value={time.value}
                      data-cy={`recipe-preparation-time-item-${i}`}
                    >
                      <option>{time.label}</option>
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
