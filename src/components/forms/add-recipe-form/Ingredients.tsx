import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const IngredientInput = ({ i }: { i: number }) => {
  return (
    <TextField
      label={`Ingredient #${i}`}
      placeholder="Enter the ingredient name"
    />
  );
};

const Ingredients = () => {
  const [ingredientsInputs, setIngredientsInputs] = useState<JSX.Element[]>([
    <IngredientInput key={1} i={1} />,
    <IngredientInput key={2} i={2} />,
    <IngredientInput key={3} i={3} />,
  ]);

  const onClick = () => {
    const newIngredientInput = (
      <IngredientInput
        key={ingredientsInputs.length + 1}
        i={ingredientsInputs.length + 1}
      />
    );
    setIngredientsInputs([...ingredientsInputs, newIngredientInput]);
  };

  return (
    <Stack gap={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Add ingredients</Typography>
        <Stack direction="row" gap={1}>
          <Button startIcon={<ChevronLeft />}>Back</Button>
          <Button variant="contained" endIcon={<ChevronRight />}>
            Next
          </Button>
        </Stack>
      </Stack>
      <Stack gap={1.5}>
        {ingredientsInputs.map((input) => input)}
        <Box>
          <Button onClick={onClick}>Add a new ingredient</Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Ingredients;
