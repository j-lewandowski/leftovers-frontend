import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { useMultistepForm } from '../../../context/MultistepFormContext';
import SaveEditedFormButton from '../../buttons/SaveEditedFormButton';

interface IngredientsProps {
  isVisible: boolean;
}

const Ingredients: React.FC<IngredientsProps> = ({ isVisible }) => {
  const { goToPreviousStep, goToNextStep, isEditMode } = useMultistepForm();
  const { watch } = useFormContext();
  const { fields, append } = useFieldArray({
    name: 'ingredients',
  });

  const onNewIngredient = (): void => {
    append({ name: '' });
  };

  const isNextDisabled = (): boolean => {
    const ingredients = watch('ingredients');
    return ingredients.every(
      (ingredient: { name: string }) => ingredient.name === '',
    );
  };

  return (
    <Stack gap={4} sx={{ display: isVisible ? 'flex' : 'none' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Add ingredients</Typography>
        <Stack direction="row" gap={1}>
          {isEditMode ? (
            <SaveEditedFormButton />
          ) : (
            <>
              <Button startIcon={<ChevronLeft />} onClick={goToPreviousStep}>
                Back
              </Button>

              <Button
                variant="contained"
                endIcon={<ChevronRight />}
                disabled={isNextDisabled()}
                onClick={goToNextStep}
              >
                Next
              </Button>
            </>
          )}
        </Stack>
      </Stack>
      <Stack gap={1.5}>
        {fields.map((item, i) => (
          <Controller
            key={item.id}
            name={`ingredients.${i}.name`}
            render={({ field }) => {
              return (
                <TextField
                  label={`Ingredient #${i + 1}`}
                  placeholder="Enter the ingredient name"
                  {...field}
                />
              );
            }}
          />
        ))}
        <Box>
          <Button onClick={onNewIngredient}>Add a new ingredient</Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Ingredients;
