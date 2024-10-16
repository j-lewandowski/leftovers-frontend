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
import { useCategories } from '../../../hooks/useCategories';
import { usePreparationTime } from '../../../hooks/usePreparationTime';

const BasicInformation = () => {
  const { categories } = useCategories();
  const { preparationTime } = usePreparationTime();

  return (
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
  );
};

export default BasicInformation;
