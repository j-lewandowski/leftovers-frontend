import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const PreparationMethodInput = ({ i }: { i: number }) => {
  return <TextField label={`Step ${i}`} placeholder="Describe the step" />;
};

const Ingredients = () => {
  const [preparationMethodInputs, setPreparationMethodInputs] = useState<
    JSX.Element[]
  >([
    <PreparationMethodInput key={1} i={1} />,
    <PreparationMethodInput key={2} i={2} />,
    <PreparationMethodInput key={3} i={3} />,
  ]);

  const onClick = () => {
    const newPreparationMethodInput = (
      <PreparationMethodInput
        key={preparationMethodInputs.length + 1}
        i={preparationMethodInputs.length + 1}
      />
    );
    setPreparationMethodInputs([
      ...preparationMethodInputs,
      newPreparationMethodInput,
    ]);
  };

  return (
    <Stack gap={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">Enter preparation method</Typography>
        <Stack direction="row" gap={1}>
          <Button startIcon={<ChevronLeft />}>Back</Button>
          <Button variant="contained" endIcon={<ChevronRight />}>
            Next
          </Button>
        </Stack>
      </Stack>
      <Stack gap={1.5}>
        {preparationMethodInputs.map((input) => input)}
        <Box>
          <Button onClick={onClick}>Add a new step</Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Ingredients;
