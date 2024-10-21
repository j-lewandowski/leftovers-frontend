import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useMultistepForm } from '../../../context/MultistepFormContext';

const PreparationMethod = ({ isVisible }: { isVisible: boolean }) => {
  const { back, next } = useMultistepForm();
  const { control, watch } = useFormContext();
  const { fields, append } = useFieldArray({
    control,
    name: 'preparationMethod',
  });

  const onClick = () => {
    append({ name: '' });
  };

  const isNextDisabled = () => {
    const ingredients = watch('preparationMethod');
    return ingredients.every(
      (ingredient: { name: string }) => ingredient.name === '',
    );
  };

  return (
    <Stack gap={4} sx={{ display: isVisible ? 'flex' : 'none' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Enter preparation method</Typography>
        <Stack direction="row" gap={1}>
          <Button startIcon={<ChevronLeft />} onClick={back}>
            Back
          </Button>
          <Button
            variant="contained"
            endIcon={<ChevronRight />}
            disabled={isNextDisabled()}
            onClick={next}
          >
            Next
          </Button>
        </Stack>
      </Stack>
      <Stack gap={1.5}>
        {fields.map((item, i) => (
          <Controller
            key={item.id}
            name={`preparationMethod.${i}.name`}
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  label={`Step ${i + 1}`}
                  placeholder="Describe the step"
                  {...field}
                />
              );
            }}
          />
        ))}
        <Box>
          <Button onClick={onClick}>Add a new step</Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default PreparationMethod;
